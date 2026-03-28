// Simple test to check if getFileView works without transformations
const { Client, Storage } = require('appwrite');

// Your Appwrite config (update these)
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Your Appwrite project ID

const storage = new Storage(client);

// Test function
async function testFileAccess() {
    try {
        // List files in your bucket (this doesn't use transformations)
        const files = await storage.listFiles('YOUR_BUCKET_ID');
        console.log('✅ File listing works:', files.files.length, 'files found');
        
        if (files.files.length > 0) {
            const fileId = files.files[0].$id;
            console.log('✅ Testing direct file access...');
            
            // Test getFileView (no transformations)
            const fileUrl = storage.getFileView('YOUR_BUCKET_ID', fileId);
            console.log('✅ Direct file URL:', fileUrl.toString());
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testFileAccess();
