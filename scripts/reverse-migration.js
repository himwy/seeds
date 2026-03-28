/**
 * Reverse Migration - Revert Cloudinary URLs back to Appwrite Storage URLs
 * 
 * This script reads the migration-mapping.json and updates all events
 * in the Appwrite database to revert from Cloudinary URLs back to 
 * Appwrite storage URLs (using /view endpoint to avoid transformation quotas).
 * 
 * Usage: node scripts/reverse-migration.js
 */

require('dotenv').config();
const { Client, Databases, Query } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Appwrite configuration
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const EVENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

function loadMigrationMapping() {
    // Try multiple locations for the mapping file
    const locations = [
        path.join(__dirname, 'migration-mapping.json'),
        path.join(__dirname, '..', '..', 'Seeds Financial Group', 'seeds', 'scripts', 'migration-mapping.json'),
        'c:\\Users\\user\\Desktop\\Seeds Financial Group\\seeds\\scripts\\migration-mapping.json',
    ];

    for (const loc of locations) {
        if (fs.existsSync(loc)) {
            console.log(`Found mapping at: ${loc}`);
            const data = JSON.parse(fs.readFileSync(loc, 'utf8'));
            return data;
        }
    }

    console.error('migration-mapping.json not found in any expected location!');
    process.exit(1);
}

/**
 * Convert an old Appwrite /preview URL to a clean /view URL
 * This avoids transformation quotas while still serving the file
 */
function convertToViewUrl(oldAppwriteUrl) {
    try {
        const url = new URL(oldAppwriteUrl);
        // Extract file ID from the URL
        const match = oldAppwriteUrl.match(/\/files\/([a-f0-9]+)\//);
        if (!match) return oldAppwriteUrl;
        
        const fileId = match[1];
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
        
        // Use /view endpoint — serves the raw file without any transformations
        // This does NOT count against Appwrite's transformation quota
        return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
    } catch (e) {
        return oldAppwriteUrl;
    }
}

/**
 * Build a reverse mapping: Cloudinary URL → Appwrite /view URL
 */
function buildReverseMapping(mapping) {
    const reverseMap = {};
    
    for (const [oldUrl, data] of Object.entries(mapping)) {
        if (data.newUrl) {
            // Map Cloudinary URL → clean Appwrite /view URL
            reverseMap[data.newUrl] = convertToViewUrl(oldUrl);
        }
    }
    
    return reverseMap;
}

/**
 * Replace Cloudinary URLs in an array of URLs
 */
function replaceUrls(urls, reverseMap) {
    if (!Array.isArray(urls)) return { urls, changed: 0 };
    
    let changed = 0;
    const newUrls = urls.map(url => {
        // Direct match
        if (reverseMap[url]) {
            changed++;
            return reverseMap[url];
        }
        
        // Check if it's a Cloudinary URL (might have slight variations)
        if (url.includes('res.cloudinary.com')) {
            // Try to find by public ID
            for (const [cloudUrl, appwriteUrl] of Object.entries(reverseMap)) {
                // Extract public ID from both and compare
                const urlPublicId = url.split('/seeds-events/')[1]?.split('.')[0];
                const mapPublicId = cloudUrl.split('/seeds-events/')[1]?.split('.')[0];
                
                if (urlPublicId && mapPublicId && urlPublicId === mapPublicId) {
                    changed++;
                    return appwriteUrl;
                }
            }
            
            // If still a Cloudinary URL without mapping, try to extract file ID
            const migrationMatch = url.match(/migrated-([a-f0-9]+)-/);
            if (migrationMatch) {
                const fileId = migrationMatch[1];
                const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
                changed++;
                return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
            }
            
            console.warn(`  ⚠️  Cloudinary URL without mapping: ${url.substring(0, 80)}...`);
        }
        
        return url;
    });
    
    return { urls: newUrls, changed };
}

async function reverseMigration() {
    console.log('🔄 REVERSE MIGRATION - Cloudinary → Appwrite');
    console.log('=============================================\n');
    
    // Validate config
    if (!DATABASE_ID || !EVENTS_COLLECTION_ID || !BUCKET_ID || !PROJECT_ID) {
        console.error('Missing environment variables. Check .env file.');
        console.log({ DATABASE_ID, EVENTS_COLLECTION_ID, BUCKET_ID, PROJECT_ID });
        process.exit(1);
    }
    
    // Load and reverse the mapping
    console.log('📂 Loading migration mapping...');
    const mapping = loadMigrationMapping();
    const mappingCount = Object.keys(mapping).length;
    console.log(`   Found ${mappingCount} URL mappings`);
    
    const reverseMap = buildReverseMapping(mapping);
    console.log(`   Built ${Object.keys(reverseMap).length} reverse mappings\n`);
    
    // Fetch all events
    console.log('📥 Fetching events from database...');
    let allEvents = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
        const response = await databases.listDocuments(
            DATABASE_ID,
            EVENTS_COLLECTION_ID,
            [
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        
        allEvents = allEvents.concat(response.documents);
        
        if (response.documents.length < limit) break;
        offset += limit;
    }
    
    console.log(`   Found ${allEvents.length} events\n`);
    
    // Process each event
    let updatedCount = 0;
    let unchangedCount = 0;
    let errorCount = 0;
    let totalUrlsReverted = 0;
    
    console.log('🔄 Reverting events to Appwrite URLs...\n');
    
    for (const event of allEvents) {
        // Parse images
        let originalImages = [];
        if (typeof event.images === 'string') {
            try {
                originalImages = JSON.parse(event.images);
            } catch (e) {
                originalImages = [];
            }
        } else if (Array.isArray(event.images)) {
            originalImages = event.images;
        }
        
        const { urls: newImages, changed } = replaceUrls(originalImages, reverseMap);
        
        // Also handle thumbnail
        let newThumbnail = event.thumbnail;
        if (newThumbnail && reverseMap[newThumbnail]) {
            newThumbnail = reverseMap[newThumbnail];
        } else if (newThumbnail && newThumbnail.includes('res.cloudinary.com')) {
            const migrationMatch = newThumbnail.match(/migrated-([a-f0-9]+)-/);
            if (migrationMatch) {
                const fileId = migrationMatch[1];
                const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
                newThumbnail = `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
            }
        }
        
        const thumbnailChanged = newThumbnail !== event.thumbnail;
        
        if (changed > 0 || thumbnailChanged) {
            try {
                const updateData = {
                    images: JSON.stringify(newImages)
                };
                if (thumbnailChanged) {
                    updateData.thumbnail = newThumbnail;
                }
                
                await databases.updateDocument(
                    DATABASE_ID,
                    EVENTS_COLLECTION_ID,
                    event.$id,
                    updateData
                );
                
                console.log(`✅ "${event.name}" — ${changed} image URLs + ${thumbnailChanged ? 1 : 0} thumbnail reverted`);
                updatedCount++;
                totalUrlsReverted += changed + (thumbnailChanged ? 1 : 0);
            } catch (error) {
                console.error(`❌ Error updating "${event.name}": ${error.message}`);
                errorCount++;
            }
        } else {
            // Check if there are still Cloudinary URLs that weren't mapped
            const hasCloudinary = originalImages.some(u => u.includes('cloudinary'));
            if (hasCloudinary) {
                console.log(`⚠️  "${event.name}" still has unmapped Cloudinary URLs`);
            }
            unchangedCount++;
        }
    }
    
    // Summary
    console.log('\n=============================================');
    console.log('📊 Reverse Migration Summary');
    console.log('=============================================');
    console.log(`✅ Events updated: ${updatedCount}`);
    console.log(`🔗 Total URLs reverted: ${totalUrlsReverted}`);
    console.log(`⏭️  Events unchanged: ${unchangedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('=============================================\n');
    
    if (updatedCount > 0) {
        console.log('🎉 Database reverted to Appwrite URLs!');
        console.log('   Images now use /view endpoint (no transformation quotas).');
    } else if (unchangedCount === allEvents.length) {
        console.log('ℹ️  No Cloudinary URLs found — database may already use Appwrite URLs.');
    }
}

// Run
reverseMigration().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
