/**
 * Smart Fix - Use full Cloudinary URL to extract base64 and decode Appwrite file IDs
 * 
 * The Cloudinary public ID format is: seeds-events/migrated-{base64_full_appwrite_url}-{timestamp}
 * But Cloudinary might truncate the display. Let's fetch the actual full URLs from the DB.
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

async function smartFix() {
    console.log('🔧 Smart Fix - Analyzing full Cloudinary URLs\n');
    
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
    
    // Collect all remaining Cloudinary URLs
    let cloudinaryUrls = [];
    
    for (const event of allEvents) {
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        for (const url of images) {
            if (url && url.includes('cloudinary')) {
                cloudinaryUrls.push({ event: event.name, eventId: event.$id, url });
            }
        }
    }
    
    console.log(`Found ${cloudinaryUrls.length} remaining Cloudinary URLs\n`);
    
    // Analyze 5 sample URLs in detail
    console.log('📊 Full URL analysis (first 5):');
    console.log('─'.repeat(80));
    
    for (let i = 0; i < Math.min(5, cloudinaryUrls.length); i++) {
        const entry = cloudinaryUrls[i];
        console.log(`\nEvent: "${entry.event}"`);
        console.log(`Full URL: ${entry.url}`);
        
        // Extract the path part after /seeds-events/
        const pathMatch = entry.url.match(/seeds-events\/(.+?)(?:\.\w+)?$/);
        if (pathMatch) {
            const fullPublicId = pathMatch[1];
            console.log(`Public ID: ${fullPublicId}`);
            console.log(`Length: ${fullPublicId.length}`);
            
            // Try decode the part between "migrated-" and the last "-{timestamp}"
            const migMatch = fullPublicId.match(/^migrated-(.+)-(\d+)$/);
            if (migMatch) {
                const base64Part = migMatch[1];
                const timestamp = migMatch[2];
                console.log(`Base64 part: ${base64Part}`);
                console.log(`Base64 length: ${base64Part.length}`);
                
                try {
                    const decoded = Buffer.from(base64Part, 'base64').toString('utf8');
                    console.log(`Decoded: ${decoded}`);
                    
                    const fileIdMatch = decoded.match(/\/files\/([a-f0-9]+)\//);
                    if (fileIdMatch) {
                        console.log(`✅ File ID: ${fileIdMatch[1]}`);
                    } else {
                        console.log(`❌ Could not extract file ID from decoded URL`);
                    }
                } catch (e) {
                    console.log(`❌ Decode error: ${e.message}`);
                }
            }
        }
    }
    
    // Now try to batch fix using the old migration script's approach
    // The migration scripts in the original project might have a different naming convention
    // Let's check the original migrate scripts for the naming pattern
    console.log('\n\n📋 Unique base64 prefixes found:');
    const prefixes = new Set();
    for (const entry of cloudinaryUrls) {
        const match = entry.url.match(/migrated-([A-Za-z0-9+/=]{10,20})/);
        if (match) {
            prefixes.add(match[1]);
        }
    }
    for (const p of prefixes) {
        const decoded = Buffer.from(p, 'base64').toString('utf8');
        console.log(`  ${p} → ${decoded}`);
    }
}

smartFix().catch(console.error);
