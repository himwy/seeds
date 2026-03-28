const { Client: OldClient, Databases: OldDatabases } = require('node-appwrite');
const { Client: NewClient, Databases: NewDatabases } = require('node-appwrite');

const oldClient = new OldClient()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68b6696d00228f71da74')
    .setKey('standard_7e5671ab31c288b804fe2989d0b5d11e0301b58c93d9d5797cd4140611eabae4de1306e196102a07fa5e953743c87c57d3d6ff123a03243533fe3baa41111791f6437499119b41f8e199cb9347c3ec2efa14d61d54906b1facbb35d5d990d4ed540e11c0d0286373776752c0038b0e5647800427b56c497e2b7e48766ea0b7a1');

const oldDatabases = new OldDatabases(oldClient);

const newClient = new NewClient()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69c4a326003bbc5062d7')
    .setKey('standard_a6eb6da25f8783d9d7f9c0fa54fb940523c302a01a779bf0b010497c1e5ffd164b63796709c5ee324f6e1818c89147c628a9f3922ae70d83d59355e4de3e5ae0f80568f8424818b7bd6c065dd22ac399dbf754738bc48f5a695ed5e32b25b4ee012ebe054a72da4765ca25caba85e66ec6f48be6e01d929962e7724fccd38634');

const newDatabases = new NewDatabases(newClient);

const OLD_DB_ID = '68b669880024b74ea88f';
const OLD_EVENTS_COLLECTION = 'events';

const NEW_DB_ID = 'seeds';
const NEW_EVENTS_COLLECTION = 'events';

const OLD_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const NEW_ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';
const OLD_PROJECT_ID = '68b6696d00228f71da74';
const NEW_PROJECT_ID = '69c4a326003bbc5062d7';

async function migrateEvents() {
    try {
        console.log('Fetching old events...');
        const result = await oldDatabases.listDocuments(OLD_DB_ID, OLD_EVENTS_COLLECTION, []);
        console.log('Found ' + result.documents.length + ' events in old database');
        
        let migratedCount = 0;
        for (const doc of result.documents) {
            console.log('Migrating event: ' + doc.name);
            
            let imagesUrlFixed = doc.images;
            if (imagesUrlFixed) {
                // String replace
                imagesUrlFixed = imagesUrlFixed.split(OLD_ENDPOINT).join(NEW_ENDPOINT);
                imagesUrlFixed = imagesUrlFixed.split(OLD_PROJECT_ID).join(NEW_PROJECT_ID);
            }
            
            let thumbnailFixed = doc.thumbnail;
            if (thumbnailFixed) {
                thumbnailFixed = thumbnailFixed.split(OLD_ENDPOINT).join(NEW_ENDPOINT);
                thumbnailFixed = thumbnailFixed.split(OLD_PROJECT_ID).join(NEW_PROJECT_ID);
            }

            const payload = {
                name: doc.name || 'Untitled',
                chineseName: doc.chineseName || '未命名',
                images: imagesUrlFixed || null,
                date: doc.date,
                category: doc.category || 'recent',
                thumbnail: thumbnailFixed || null,
                isVideo: doc.isVideo === true ? true : false,
            };

            try {
                await newDatabases.createDocument(
                    NEW_DB_ID, 
                    NEW_EVENTS_COLLECTION, 
                    doc.$id, 
                    payload
                );
                migratedCount++;
            } catch (e) {
                if (e.code === 409) {
                    console.log('Event ' + doc.$id + ' already exists. Updating...');
                    await newDatabases.updateDocument(
                        NEW_DB_ID, 
                        NEW_EVENTS_COLLECTION, 
                        doc.$id, 
                        payload
                    );
                    migratedCount++;
                } else {
                    console.error('Error with doc:', doc.$id, e.message);
                }
            }
        }
        console.log('Successfully migrated ' + migratedCount + ' events!');
    } catch (e) {
        console.error('Migration error:', e);
    }
}

migrateEvents();