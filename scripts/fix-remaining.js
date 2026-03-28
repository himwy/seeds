/**
 * Fix remaining Cloudinary URLs by decoding base64-encoded original URLs
 * 
 * Some Cloudinary public IDs contain base64-encoded original Appwrite URLs
 * Format: migrated-{base64_encoded_appwrite_url}-{timestamp}
 */

require('dotenv').config();
const { Client, Databases, Query } = require('node-appwrite');

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

/**
 * Extract file ID from a Cloudinary URL by decoding the base64-encoded Appwrite URL
 */
function extractFileIdFromCloudinaryUrl(url) {
    try {
        // Pattern: migrated-{base64_or_hex_data}-{timestamp}
        // Try extracting the middle part
        const match = url.match(/migrated-([^/]+?)(?:\.\w+)?$/);
        if (!match) return null;
        
        const encodedPart = match[1];
        // Remove timestamp suffix (last segment after -)
        const parts = encodedPart.split('-');
        if (parts.length < 2) return null;
        
        // The timestamp is the last part
        parts.pop();
        const encoded = parts.join('-');
        
        // Try base64 decode
        try {
            const decoded = Buffer.from(encoded, 'base64').toString('utf8');
            // Check if it looks like a URL
            if (decoded.includes('appwrite') || decoded.includes('http')) {
                // Extract file ID from the decoded URL
                const fileIdMatch = decoded.match(/\/files\/([a-f0-9]+)\//);
                if (fileIdMatch) {
                    return fileIdMatch[1];
                }
            }
        } catch (e) {
            // Not base64
        }
        
        // Try if it's a hex file ID directly
        if (/^[a-f0-9]{20,}$/.test(encoded)) {
            return encoded;
        }
        
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Convert Cloudinary URL to Appwrite /view URL
 */
function cloudinaryToAppwrite(url) {
    const fileId = extractFileIdFromCloudinaryUrl(url);
    if (fileId) {
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
        return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
    }
    return null;
}

async function fixRemaining() {
    console.log('🔧 Fix Remaining Cloudinary URLs (base64 decode)\n');
    
    // First, let's decode one sample URL to verify
    const sampleUrl = "https://res.cloudinary.com/dppn7wogr/image/upload/v1768807479/seeds-events/migrated-aHR0cHM6Ly9mcmEuY2xv-1768807477763.jpg";
    const match = sampleUrl.match(/migrated-([^/]+?)\.(\w+)$/);
    if (match) {
        const fullId = match[1];
        const parts = fullId.split('-');
        const timestamp = parts.pop();
        const encoded = parts.join('-');
        
        console.log(`Sample analysis:`);
        console.log(`  Full public ID: migrated-${fullId}`);
        console.log(`  Encoded part: ${encoded}`);
        console.log(`  Timestamp: ${timestamp}`);
        
        try {
            const decoded = Buffer.from(encoded, 'base64').toString('utf8');
            console.log(`  Base64 decoded: ${decoded}`);
            const fileIdMatch = decoded.match(/\/files\/([a-f0-9]+)\//);
            if (fileIdMatch) {
                console.log(`  Appwrite file ID: ${fileIdMatch[1]}`);
            }
        } catch (e) {
            console.log(`  Not valid base64: ${e.message}`);
        }
    }
    
    // Fetch all events
    console.log('\n📥 Fetching events...');
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
    
    console.log(`   Found ${allEvents.length} events\n`);
    
    let updatedCount = 0;
    let errorCount = 0;
    let unchangedCount = 0;
    let totalUrlsFixed = 0;
    let unfixableUrls = [];
    
    for (let i = 0; i < allEvents.length; i++) {
        const event = allEvents[i];
        
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        const cloudinaryUrls = images.filter(u => u && u.includes('cloudinary'));
        if (cloudinaryUrls.length === 0) {
            unchangedCount++;
            continue;
        }
        
        let changed = 0;
        const newImages = images.map(url => {
            if (!url || !url.includes('cloudinary')) return url;
            
            const appwriteUrl = cloudinaryToAppwrite(url);
            if (appwriteUrl) {
                changed++;
                return appwriteUrl;
            }
            
            unfixableUrls.push({ event: event.name, url });
            return url; // Keep original if can't convert
        });
        
        if (changed > 0) {
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    await databases.updateDocument(
                        DATABASE_ID,
                        EVENTS_COLLECTION_ID,
                        event.$id,
                        { images: JSON.stringify(newImages) }
                    );
                    
                    console.log(`✅ [${i+1}/${allEvents.length}] "${event.name}" — ${changed}/${cloudinaryUrls.length} URLs fixed`);
                    updatedCount++;
                    totalUrlsFixed += changed;
                    break;
                } catch (error) {
                    if (attempt === 3) {
                        console.error(`❌ "${event.name}": ${error.message}`);
                        errorCount++;
                    }
                    await sleep(2000 * attempt);
                }
            }
        }
        
        await sleep(500);
    }
    
    console.log('\n=============================');
    console.log('📊 Fix Summary');
    console.log('=============================');
    console.log(`✅ Events fixed: ${updatedCount}`);
    console.log(`🔗 URLs fixed: ${totalUrlsFixed}`);
    console.log(`⏭️  Already OK: ${unchangedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`⚠️  Unfixable URLs: ${unfixableUrls.length}`);
    
    if (unfixableUrls.length > 0) {
        console.log('\nUnfixable URLs:');
        for (const u of unfixableUrls) {
            console.log(`  - ${u.event}: ${u.url.substring(0, 80)}...`);
        }
    }
}

fixRemaining().catch(console.error);
