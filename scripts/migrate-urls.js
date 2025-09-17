// One-time script to migrate all preview URLs to view URLs in the database
// Run this with: node scripts/migrate-urls.js

const { Client, Databases, Storage } = require("appwrite");

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const EVENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

// Function to extract file ID from Appwrite URL
function extractFileIdFromUrl(url) {
  const patterns = [
    /\/files\/([a-zA-Z0-9]{20,36})\/(?:view|preview)/,
    /\/files\/([a-zA-Z0-9]{20,36})(?:\/|\?|$)/,
    /fileId[=:]([a-zA-Z0-9]{20,36})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Function to convert preview URL to view URL
function convertToViewUrl(url) {
  if (url.includes("cloud.appwrite.io") && url.includes("preview")) {
    const fileId = extractFileIdFromUrl(url);
    if (fileId) {
      return storage.getFileView(STORAGE_BUCKET_ID, fileId).toString();
    }
  }
  return url;
}

async function migrateUrls() {
  try {
    console.log("🚀 Starting URL migration...");

    // Get all events
    const response = await databases.listDocuments(
      DATABASE_ID,
      EVENTS_TABLE_ID,
      [require("appwrite").Query.limit(500)]
    );

    console.log(`📊 Found ${response.documents.length} events to check`);

    let updatedCount = 0;

    for (const doc of response.documents) {
      let images = [];
      try {
        images = JSON.parse(doc.images || "[]");
      } catch (error) {
        console.warn(
          `⚠️  Failed to parse images for event ${doc.name}:`,
          error
        );
        continue;
      }

      let hasChanges = false;
      const newImages = images.map((url) => {
        const newUrl = convertToViewUrl(url);
        if (newUrl !== url) {
          console.log(`🔄 Converting: ${url} -> ${newUrl}`);
          hasChanges = true;
        }
        return newUrl;
      });

      if (hasChanges) {
        try {
          await databases.updateDocument(
            DATABASE_ID,
            EVENTS_TABLE_ID,
            doc.$id,
            {
              images: JSON.stringify(newImages),
            }
          );
          updatedCount++;
          console.log(`✅ Updated event: ${doc.name}`);
        } catch (error) {
          console.error(`❌ Failed to update event ${doc.name}:`, error);
        }
      } else {
        console.log(`➡️  No changes needed for: ${doc.name}`);
      }
    }

    console.log(`🎉 Migration complete! Updated ${updatedCount} events.`);
    console.log("🔥 Your image transformation usage should now be reset!");
  } catch (error) {
    console.error("💥 Migration failed:", error);
  }
}

// Check if required environment variables are set
if (!DATABASE_ID || !EVENTS_TABLE_ID || !STORAGE_BUCKET_ID) {
  console.error(
    "❌ Missing required environment variables. Please check your .env file."
  );
  process.exit(1);
}

// Run the migration
migrateUrls();
