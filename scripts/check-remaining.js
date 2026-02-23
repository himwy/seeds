/**
 * Check remaining Cloudinary URLs - identify what's still broken
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

async function checkRemaining() {
    console.log('🔍 Checking for remaining Cloudinary URLs...\n');
    
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
    
    let cloudinaryCount = 0;
    let appwriteCount = 0;
    let otherCount = 0;
    let brokenEvents = [];
    
    for (const event of allEvents) {
        let images = [];
        if (typeof event.images === 'string') {
            try { images = JSON.parse(event.images); } catch (e) { images = []; }
        } else if (Array.isArray(event.images)) {
            images = event.images;
        }
        
        const cloudinaryUrls = images.filter(u => u && u.includes('cloudinary'));
        const appwriteUrls = images.filter(u => u && u.includes('appwrite'));
        
        if (cloudinaryUrls.length > 0) {
            cloudinaryCount += cloudinaryUrls.length;
            brokenEvents.push({
                name: event.name,
                id: event.$id,
                totalImages: images.length,
                cloudinaryUrls: cloudinaryUrls.length,
                appwriteUrls: appwriteUrls.length,
                sampleUrl: cloudinaryUrls[0]
            });
        }
        
        appwriteCount += appwriteUrls.length;
        otherCount += images.filter(u => u && !u.includes('cloudinary') && !u.includes('appwrite')).length;
    }
    
    console.log('📊 URL Status Summary');
    console.log('=====================');
    console.log(`Total events: ${allEvents.length}`);
    console.log(`Appwrite URLs: ${appwriteCount} ✅`);
    console.log(`Cloudinary URLs: ${cloudinaryCount} ❌ (broken)`);
    console.log(`Other URLs: ${otherCount}`);
    console.log(`\nEvents with broken Cloudinary URLs: ${brokenEvents.length}\n`);
    
    if (brokenEvents.length > 0) {
        console.log('Broken events detail:');
        console.log('─────────────────────');
        for (const evt of brokenEvents) {
            console.log(`\n📸 "${evt.name}" (ID: ${evt.id})`);
            console.log(`   Images: ${evt.totalImages} total, ${evt.cloudinaryUrls} Cloudinary, ${evt.appwriteUrls} Appwrite`);
            console.log(`   Sample: ${evt.sampleUrl.substring(0, 100)}...`);
            
            // Check if we can extract Appwrite file IDs from the Cloudinary URL
            const match = evt.sampleUrl.match(/migrated-([a-f0-9]+)-/);
            if (match) {
                console.log(`   🔑 Extractable file ID: ${match[1]}`);
            } else {
                // Check for direct upload naming pattern
                const directMatch = evt.sampleUrl.match(/seeds-events\/([^.]+)/);
                if (directMatch) {
                    console.log(`   📝 Cloudinary public ID: ${directMatch[1]}`);
                }
            }
        }
    }
}

checkRemaining().catch(console.error);
