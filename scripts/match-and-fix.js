/**
 * Match unmapped Appwrite files to broken events by timestamp/ID prefix matching
 * 
 * Observation: Event document IDs and file IDs share the same hex prefix (first 8 chars = Appwrite timestamp)
 * Files are uploaded just milliseconds before the event document is created.
 * 
 * Strategy: For each broken event, find all unmapped files whose IDs share the same 
 * timestamp prefix and were created within the same second.
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

async function listAllFiles() {
    let allFiles = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
        try {
            const response = await storageClient.listFiles(
                BUCKET_ID,
                [Query.limit(limit), Query.offset(offset), Query.orderAsc('$createdAt')]
            );
            allFiles = allFiles.concat(response.files);
            if (response.files.length < limit) break;
            offset += limit;
            await sleep(300);
        } catch (error) {
            console.error(`Error listing files: ${error.message}`);
            break;
        }
    }
    
    return allFiles;
}

async function matchAndFix() {
    console.log('🔧 Match & Fix - Timestamp-based file matching\n');
    
    // Load mapping to know which file IDs are already handled
    const fs = require('fs');
    const path = require('path');
    const mappingPath = path.join(__dirname, 'migration-mapping.json');
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    
    const mappedFileIds = new Set();
    for (const [oldUrl] of Object.entries(mapping)) {
        const match = oldUrl.match(/\/files\/([a-f0-9]+)\//);
        if (match) mappedFileIds.add(match[1]);
    }
    
    // List all storage files
    console.log('📂 Listing storage files...');
    const allFiles = await listAllFiles();
    console.log(`   Total: ${allFiles.length} files`);
    
    // Get unmapped files
    const unmappedFiles = allFiles.filter(f => !mappedFileIds.has(f.$id));
    console.log(`   Unmapped: ${unmappedFiles.length} files\n`);
    
    // Fetch all events
    console.log('📥 Fetching events...');
    let allEvents = [];
    let offset = 0;
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
    console.log(`   Total: ${allEvents.length} events\n`);
    
    // Identify broken events
    const brokenEvents = [];
    for (const event of allEvents) {
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        const cloudinaryUrls = images.filter(u => u && u.includes('cloudinary'));
        if (cloudinaryUrls.length > 0) {
            brokenEvents.push({
                id: event.$id,
                name: event.name,
                images,
                cloudinaryCount: cloudinaryUrls.length,
                createdAt: new Date(event.$createdAt),
            });
        }
    }
    
    console.log(`🔍 Matching ${brokenEvents.length} broken events to ${unmappedFiles.length} unmapped files...\n`);
    
    // For each broken event, find matching files by ID prefix
    // Appwrite IDs: first 8 hex chars = hex timestamp, rest = random
    // Event and its files share the same timestamp prefix
    let updatedCount = 0;
    let errorCount = 0;
    let totalFixed = 0;
    const usedFileIds = new Set();
    
    for (const evt of brokenEvents) {
        // Get the first 8 chars of event ID (timestamp part)
        const eventPrefix = evt.id.substring(0, 8);
        const eventTime = evt.createdAt.getTime();
        
        // Find files with matching prefix that haven't been used
        const matchingFiles = unmappedFiles.filter(f => {
            if (usedFileIds.has(f.$id)) return false;
            
            const filePrefix = f.$id.substring(0, 8);
            const fileTime = new Date(f.$createdAt).getTime();
            
            // Match by: same prefix OR created within 5 seconds of each other
            return filePrefix === eventPrefix || 
                   Math.abs(fileTime - eventTime) < 5000;
        });
        
        if (matchingFiles.length === 0) {
            console.log(`❌ "${evt.name}" — No matching files found (prefix: ${eventPrefix})`);
            errorCount++;
            continue;
        }
        
        console.log(`\n📸 "${evt.name}" (${evt.cloudinaryCount} broken, found ${matchingFiles.length} matching files)`);
        
        // Sort matching files by creation time
        matchingFiles.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
        
        if (matchingFiles.length < evt.cloudinaryCount) {
            console.log(`   ⚠️  Only ${matchingFiles.length} files for ${evt.cloudinaryCount} broken URLs`);
        }
        
        // Replace Cloudinary URLs with matched Appwrite files
        let cloudinaryIdx = 0;
        const newImages = evt.images.map(url => {
            if (!url || !url.includes('cloudinary')) return url;
            
            if (cloudinaryIdx < matchingFiles.length) {
                const file = matchingFiles[cloudinaryIdx];
                cloudinaryIdx++;
                usedFileIds.add(file.$id);
                const newUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
                console.log(`   🔗 ${file.name} → ${file.$id}`);
                return newUrl;
            }
            
            return url; // No more files available
        });
        
        const fixedCount = cloudinaryIdx;
        
        if (fixedCount > 0) {
            // Update the database
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    await databases.updateDocument(
                        DATABASE_ID,
                        EVENTS_COLLECTION_ID,
                        evt.id,
                        { images: JSON.stringify(newImages) }
                    );
                    console.log(`   ✅ Updated! (${fixedCount}/${evt.cloudinaryCount} fixed)`);
                    updatedCount++;
                    totalFixed += fixedCount;
                    break;
                } catch (error) {
                    if (attempt === 3) {
                        console.error(`   ❌ Failed: ${error.message}`);
                        errorCount++;
                    }
                    await sleep(2000 * attempt);
                }
            }
        }
        
        await sleep(500);
    }
    
    console.log('\n=========================================');
    console.log('📊 Match & Fix Summary');
    console.log('=========================================');
    console.log(`✅ Events fixed: ${updatedCount}`);
    console.log(`🔗 URLs fixed: ${totalFixed}`);
    console.log(`❌ Unmatched: ${errorCount}`);
    console.log('=========================================\n');
}

matchAndFix().catch(console.error);
