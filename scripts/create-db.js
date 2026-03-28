const { Client: NewClient, Databases: NewDatabases } = require('node-appwrite');

const newClient = new NewClient()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69c4a326003bbc5062d7')
    .setKey('standard_a6eb6da25f8783d9d7f9c0fa54fb940523c302a01a779bf0b010497c1e5ffd164b63796709c5ee324f6e1818c89147c628a9f3922ae70d83d59355e4de3e5ae0f80568f8424818b7bd6c065dd22ac399dbf754738bc48f5a695ed5e32b25b4ee012ebe054a72da4765ca25caba85e66ec6f48be6e01d929962e7724fccd38634');

const newDatabases = new NewDatabases(newClient);

const NEW_DB_ID = 'seeds';

async function createCollections() {
    try {
        console.log('Creating events collection...');
        await newDatabases.createCollection(NEW_DB_ID, 'events', 'events', [
            'read("any")'
        ], false, false);

        console.log('Creating attributes...');
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'name', 255, true);
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'chineseName', 255, false);
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'images', 100000, false);
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'date', 255, false);
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'category', 255, false);
        await newDatabases.createStringAttribute(NEW_DB_ID, 'events', 'thumbnail', 1000, false);
        await newDatabases.createBooleanAttribute(NEW_DB_ID, 'events', 'isVideo', false, false);
        
        console.log('Waiting for attributes to be prepared...');
        await new Promise(r => setTimeout(r, 3000));
        console.log('Done!');
    } catch (e) {
        console.error('Error creating database layout:', e);
    }
}

createCollections();