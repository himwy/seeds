/**
 * Fix remaining Cloudinary URLs by listing ALL files in Appwrite Storage
 * and matching them to the broken Cloudinary URLs via timestamp proximity.
 * 
 * Strategy:
 * 1. List all files in Appwrite storage bucket
 * 2. For events with ALL Cloudinary URLs (no Appwrite URLs), 
 *    check if the event's Appwrite document ID can help us find the files
 * 3. For the Cloudinary URLs with base64-truncated IDs, 
 *    use the migration timestamp to find corresponding Appwrite files
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
    console.log('📂 Listing all files in Appwrite storage bucket...');
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
            console.log(`   Fetched ${allFiles.length} files so far...`);
            
            if (response.files.length < limit) break;
            offset += limit;
            await sleep(300);
        } catch (error) {
            console.error(`Error listing files at offset ${offset}: ${error.message}`);
            break;
        }
    }
    
    console.log(`   Total files: ${allFiles.length}\n`);
    return allFiles;
}

async function fixByStorageListing() {
    console.log('🔧 Fix Remaining Cloudinary URLs via Storage Bucket Listing\n');
    
    // Step 1: List all files in storage
    const allFiles = await listAllFiles();
    
    if (allFiles.length === 0) {
        console.log('❌ No files found in storage bucket!');
        return;
    }
    
    // Build a map: fileId → view URL
    const fileIdToUrl = {};
    for (const file of allFiles) {
        fileIdToUrl[file.$id] = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    }
    
    console.log(`📋 Available file IDs (first 10): ${allFiles.slice(0, 10).map(f => f.$id).join(', ')}`);
    
    // Step 2: Load the migration mapping to see which file IDs were already mapped
    const fs = require('fs');
    const path = require('path');
    const mappingPath = path.join(__dirname, 'migration-mapping.json');
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    
    // Extract all file IDs that were in the original mapping (already handled)
    const mappedFileIds = new Set();
    for (const [oldUrl, data] of Object.entries(mapping)) {
        const match = oldUrl.match(/\/files\/([a-f0-9]+)\//);
        if (match) {
            mappedFileIds.add(match[1]);
        }
    }
    console.log(`\n📊 File IDs in original mapping: ${mappedFileIds.size}`);
    
    // Find unmapped files in storage
    const unmappedFiles = allFiles.filter(f => !mappedFileIds.has(f.$id));
    console.log(`📊 Unmapped files in storage: ${unmappedFiles.length}\n`);
    
    // Step 3: Fetch events with Cloudinary URLs
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
                totalCount: images.length,
                createdAt: event.$createdAt,
            });
        }
    }
    
    console.log(`📊 Events with broken Cloudinary URLs: ${brokenEvents.length}`);
    console.log(`📊 Total broken image slots: ${brokenEvents.reduce((sum, e) => sum + e.cloudinaryCount, 0)}`);
    console.log(`📊 Unmapped Appwrite files available: ${unmappedFiles.length}\n`);
    
    // Step 4: Try to match by file creation timestamp proximity to event creation
    // Group unmapped files by creation date
    console.log('🔍 Unmapped file details:');
    for (const file of unmappedFiles.slice(0, 20)) {
        console.log(`  ${file.$id} - ${file.name} (${file.mimeType}, ${Math.round(file.sizeOriginal/1024)}KB) created: ${file.$createdAt}`);
    }
    
    // Step 5: For events that have a mix of Appwrite + Cloudinary URLs,
    // the Appwrite file IDs can give us context about what other files belong to same event
    console.log('\n📋 Events with mixed URLs (partial fix possible):');
    for (const evt of brokenEvents) {
        const appwriteUrls = evt.images.filter(u => u && u.includes('appwrite'));
        if (appwriteUrls.length > 0) {
            const fileIds = appwriteUrls.map(u => {
                const m = u.match(/\/files\/([a-f0-9]+)\//);
                return m ? m[1] : 'unknown';
            });
            console.log(`\n  "${evt.name}": ${evt.cloudinaryCount} broken + ${appwriteUrls.length} working`);
            console.log(`  Working file IDs: ${fileIds.join(', ')}`);
        }
    }
    
    // Output summary for manual review
    console.log('\n\n📋 BROKEN EVENTS LIST (for reference):');
    for (const evt of brokenEvents) {
        console.log(`\n  Event: "${evt.name}" (ID: ${evt.id})`);
        console.log(`  Created: ${evt.createdAt}`);
        console.log(`  Images: ${evt.cloudinaryCount} Cloudinary (broken) / ${evt.totalCount} total`);
    }
}

fixByStorageListing().catch(console.error);
