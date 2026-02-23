/**
 * Retry Reverse Migration - with delays to avoid rate limiting
 * 
 * Usage: node scripts/retry-reverse-migration.js
 */

require('dotenv').config();
const { Client, Databases, Query } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const EVENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadMigrationMapping() {
    const locations = [
        path.join(__dirname, 'migration-mapping.json'),
        'c:\\Users\\user\\Desktop\\Seeds Financial Group\\seeds\\scripts\\migration-mapping.json',
    ];

    for (const loc of locations) {
        if (fs.existsSync(loc)) {
            return JSON.parse(fs.readFileSync(loc, 'utf8'));
        }
    }
    console.error('migration-mapping.json not found!');
    process.exit(1);
}

function convertToViewUrl(oldAppwriteUrl) {
    try {
        const match = oldAppwriteUrl.match(/\/files\/([a-f0-9]+)\//);
        if (!match) return oldAppwriteUrl;
        
        const fileId = match[1];
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
        return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
    } catch (e) {
        return oldAppwriteUrl;
    }
}

function buildReverseMapping(mapping) {
    const reverseMap = {};
    for (const [oldUrl, data] of Object.entries(mapping)) {
        if (data.newUrl) {
            reverseMap[data.newUrl] = convertToViewUrl(oldUrl);
        }
    }
    return reverseMap;
}

function replaceUrls(urls, reverseMap) {
    if (!Array.isArray(urls)) return { urls, changed: 0 };
    
    let changed = 0;
    const newUrls = urls.map(url => {
        if (reverseMap[url]) {
            changed++;
            return reverseMap[url];
        }
        
        if (url.includes('res.cloudinary.com')) {
            // Try public ID match
            for (const [cloudUrl, appwriteUrl] of Object.entries(reverseMap)) {
                const urlPublicId = url.split('/seeds-events/')[1]?.split('.')[0];
                const mapPublicId = cloudUrl.split('/seeds-events/')[1]?.split('.')[0];
                if (urlPublicId && mapPublicId && urlPublicId === mapPublicId) {
                    changed++;
                    return appwriteUrl;
                }
            }
            
            // Try file ID extraction from Cloudinary naming convention
            const migrationMatch = url.match(/migrated-([a-f0-9]+)-/);
            if (migrationMatch) {
                const fileId = migrationMatch[1];
                const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
                changed++;
                return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
            }
        }
        
        return url;
    });
    
    return { urls: newUrls, changed };
}

async function retryMigration() {
    console.log('🔄 RETRY REVERSE MIGRATION (with delays)');
    console.log('=========================================\n');
    
    const mapping = loadMigrationMapping();
    const reverseMap = buildReverseMapping(mapping);
    console.log(`   ${Object.keys(reverseMap).length} reverse mappings loaded\n`);
    
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
        await sleep(500);
    }
    
    console.log(`   Found ${allEvents.length} events\n`);
    
    let updatedCount = 0;
    let unchangedCount = 0;
    let errorCount = 0;
    let totalUrlsReverted = 0;
    
    for (let i = 0; i < allEvents.length; i++) {
        const event = allEvents[i];
        
        let originalImages = [];
        if (typeof event.images === 'string') {
            try { originalImages = JSON.parse(event.images); } catch (e) { originalImages = []; }
        } else if (Array.isArray(event.images)) {
            originalImages = event.images;
        }
        
        const { urls: newImages, changed } = replaceUrls(originalImages, reverseMap);
        
        // Handle thumbnail
        let newThumbnail = event.thumbnail;
        let thumbnailChanged = false;
        if (newThumbnail && reverseMap[newThumbnail]) {
            newThumbnail = reverseMap[newThumbnail];
            thumbnailChanged = true;
        } else if (newThumbnail && newThumbnail.includes('res.cloudinary.com')) {
            const migrationMatch = newThumbnail.match(/migrated-([a-f0-9]+)-/);
            if (migrationMatch) {
                const fileId = migrationMatch[1];
                const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
                newThumbnail = `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
                thumbnailChanged = true;
            }
        }
        
        if (changed > 0 || thumbnailChanged) {
            // Retry up to 3 times with increasing delays
            let success = false;
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    const updateData = { images: JSON.stringify(newImages) };
                    if (thumbnailChanged) updateData.thumbnail = newThumbnail;
                    
                    await databases.updateDocument(
                        DATABASE_ID,
                        EVENTS_COLLECTION_ID,
                        event.$id,
                        updateData
                    );
                    
                    console.log(`✅ [${i+1}/${allEvents.length}] "${event.name}" — ${changed} URLs reverted`);
                    updatedCount++;
                    totalUrlsReverted += changed + (thumbnailChanged ? 1 : 0);
                    success = true;
                    break;
                } catch (error) {
                    console.log(`   ⚠️  Attempt ${attempt}/3 failed for "${event.name}": ${error.message}`);
                    await sleep(2000 * attempt); // 2s, 4s, 6s backoff
                }
            }
            
            if (!success) {
                console.error(`❌ Failed after 3 attempts: "${event.name}"`);
                errorCount++;
            }
        } else {
            // Check for remaining Cloudinary URLs
            const hasCloudinary = originalImages.some(u => u && u.includes('cloudinary'));
            if (hasCloudinary) {
                console.log(`⚠️  "${event.name}" still has unmapped Cloudinary URLs`);
                errorCount++;
            } else {
                unchangedCount++;
            }
        }
        
        // Delay between updates to avoid rate limiting
        await sleep(500);
    }
    
    console.log('\n=========================================');
    console.log('📊 Retry Migration Summary');
    console.log('=========================================');
    console.log(`✅ Events updated: ${updatedCount}`);
    console.log(`🔗 Total URLs reverted: ${totalUrlsReverted}`);
    console.log(`⏭️  Events unchanged: ${unchangedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('=========================================\n');
}

retryMigration().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
