/**
 * Read-only inspection of Appwrite project state.
 * Reads creds from .env.temp via `node --env-file=.env.temp`.
 * Never logs the API key.
 */
const { Client, Databases, Storage, Users } = require("node-appwrite");

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const eventsId = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const contactId = process.env.NEXT_PUBLIC_APPWRITE_CONTACT_MESSAGES_TABLE_ID;
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

function need(name, value) {
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
}
need("NEXT_PUBLIC_APPWRITE_ENDPOINT", endpoint);
need("NEXT_PUBLIC_APPWRITE_PROJECT_ID", projectId);
need("APPWRITE_API_KEY", apiKey);
need("NEXT_PUBLIC_APPWRITE_DATABASE_ID", databaseId);

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

(async () => {
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Project:  ${projectId}`);
  console.log(`Database: ${databaseId}`);
  console.log(`Bucket:   ${bucketId}`);
  console.log("");

  // Users — looking for admin candidates
  try {
    const list = await users.list();
    console.log(`-- Users (total ${list.total}) --`);
    for (const u of list.users) {
      console.log(`  ${u.email}  id=${u.$id}  labels=${JSON.stringify(u.labels || [])}`);
    }
  } catch (e) {
    console.error("users:", e.message);
  }

  // Events collection
  if (eventsId) {
    console.log(`\n-- Events collection (${eventsId}) --`);
    try {
      const c = await databases.getCollection(databaseId, eventsId);
      console.log(`  name=${c.name}  enabled=${c.enabled}  documentSecurity=${c.documentSecurity}`);
      console.log(`  permissions: ${JSON.stringify(c.$permissions || [])}`);
    } catch (e) {
      console.error(`  error: ${e.message}`);
    }
  }

  // Contact collection
  if (contactId) {
    console.log(`\n-- Contact collection (${contactId}) --`);
    try {
      const c = await databases.getCollection(databaseId, contactId);
      console.log(`  name=${c.name}  enabled=${c.enabled}  documentSecurity=${c.documentSecurity}`);
      console.log(`  permissions: ${JSON.stringify(c.$permissions || [])}`);
    } catch (e) {
      console.error(`  error: ${e.message}`);
    }
  }

  // Bucket
  if (bucketId) {
    console.log(`\n-- Bucket (${bucketId}) --`);
    try {
      const b = await storage.getBucket(bucketId);
      console.log(`  name=${b.name}  enabled=${b.enabled}  fileSecurity=${b.fileSecurity}`);
      console.log(`  maximumFileSize=${b.maximumFileSize}  allowedFileExtensions=${JSON.stringify(b.allowedFileExtensions)}`);
      console.log(`  permissions: ${JSON.stringify(b.$permissions || [])}`);
    } catch (e) {
      console.error(`  error: ${e.message}`);
    }
  }
})().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
