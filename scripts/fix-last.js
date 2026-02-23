/**
 * Fix the last 2-3 remaining Cloudinary URLs by widening the time window
 */

require('dotenv').config();
const { Client, Databases, Storage, Query } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storageClient = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const EVENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixLast() {
    console.log('🔧 Fixing last remaining Cloudinary URLs\n');
    
    // Target events
    const targetIds = ['68ba42c0000e096f0e9f', '68c0d8230034226b140f'];
    
    // List ALL files and find any unused ones near these event timestamps
    let allFiles = [];
    let offset = 0;
    while (true) {
        const response = await storageClient.listFiles(
            BUCKET_ID,
            [Query.limit(100), Query.offset(offset), Query.orderAsc('$createdAt')]
        );
        allFiles = allFiles.concat(response.files);
        if (response.files.length < 100) break;
        offset += 100;
        await sleep(300);
    }
    console.log(`Total files in storage: ${allFiles.length}`);
    
    // Get all events to find which file IDs are in use
    let allEvents = [];
    offset = 0;
    while (true) {
        const response = await databases.listDocuments(
            DATABASE_ID,
            EVENTS_COLLECTION_ID,
            [Query.limit(100), Query.offset(offset)]
        );
        allEvents = allEvents.concat(response.documents);
        if (response.documents.length < 100) break;
        offset += 100;
        await sleep(300);
    }
    
    // Collect ALL file IDs currently used in events
    const usedFileIds = new Set();
    for (const event of allEvents) {
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        for (const url of images) {
            if (url && url.includes('appwrite')) {
                const match = url.match(/\/files\/([a-f0-9]+)\//);
                if (match) usedFileIds.add(match[1]);
            }
        }
    }
    
    // Find unused files
    const unusedFiles = allFiles.filter(f => !usedFileIds.has(f.$id));
    console.log(`Unused files: ${unusedFiles.length}\n`);
    
    // For each target event, find nearby unused files
    for (const targetId of targetIds) {
        const event = allEvents.find(e => e.$id === targetId);
        if (!event) { console.log(`Event ${targetId} not found`); continue; }
        
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        const cloudinaryUrls = images.filter(u => u && u.includes('cloudinary'));
        if (cloudinaryUrls.length === 0) { console.log(`"${event.name}" — no Cloudinary URLs`); continue; }
        
        const eventTime = new Date(event.$createdAt).getTime();
        console.log(`\n📸 "${event.name}" (${cloudinaryUrls.length} broken)`);
        console.log(`   Event created: ${event.$createdAt}`);
        console.log(`   Event ID prefix: ${targetId.substring(0, 8)}`);
        
        // Find unused files within 60 seconds 
        const nearbyFiles = unusedFiles.filter(f => {
            const fileTime = new Date(f.$createdAt).getTime();
            return Math.abs(fileTime - eventTime) < 60000;
        }).sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
        
        console.log(`   Nearby unused files (±60s): ${nearbyFiles.length}`);
        for (const f of nearbyFiles) {
            console.log(`     ${f.$id} - ${f.name} (${f.$createdAt})`);
        }
        
        // Also show files with matching ID prefix (±2 hex digits)
        const prefix6 = targetId.substring(0, 6);
        const prefixFiles = unusedFiles.filter(f => f.$id.startsWith(prefix6));
        console.log(`   Files with prefix ${prefix6}*: ${prefixFiles.length}`);
        for (const f of prefixFiles) {
            console.log(`     ${f.$id} - ${f.name} (${f.$createdAt})`);
        }
        
        // Try to assign nearby files to broken URLs
        const candidates = nearbyFiles.length > 0 ? nearbyFiles : prefixFiles;
        if (candidates.length >= cloudinaryUrls.length) {
            let idx = 0;
            const newImages = images.map(url => {
                if (!url || !url.includes('cloudinary')) return url;
                if (idx < candidates.length) {
                    const file = candidates[idx++];
                    return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
                }
                return url;
            });
            
            try {
                await databases.updateDocument(
                    DATABASE_ID,
                    EVENTS_COLLECTION_ID,
                    targetId,
                    { images: JSON.stringify(newImages) }
                );
                console.log(`   ✅ Fixed!`);
            } catch (error) {
                console.error(`   ❌ ${error.message}`);
            }
        } else {
            console.log(`   ⚠️  Not enough candidate files to fix`);
        }
        
        await sleep(500);
    }
}

fixLast().catch(console.error);
