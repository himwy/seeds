/**
 * One-off: harden Appwrite permissions to use the `admin` label instead of
 * a specific user ID, and tighten bucket file limits.
 *
 * Run with:  node --env-file=.env.temp scripts/apply-appwrite-permissions.js
 *
 * Idempotent — safe to re-run.
 */
const {
  Client,
  Databases,
  Storage,
  Permission,
  Role,
} = require("node-appwrite");

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const eventsId = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
const contactId = process.env.NEXT_PUBLIC_APPWRITE_CONTACT_MESSAGES_TABLE_ID;
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

for (const [name, value] of Object.entries({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: projectId,
  APPWRITE_API_KEY: apiKey,
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: databaseId,
  NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID: eventsId,
  NEXT_PUBLIC_APPWRITE_CONTACT_MESSAGES_TABLE_ID: contactId,
  NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID: bucketId,
})) {
  if (!value) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);
const databases = new Databases(client);
const storage = new Storage(client);

const ADMIN = Role.label("admin");
const ANY = Role.any();

async function updateEventsCollection() {
  console.log(`\n→ events collection (${eventsId})`);
  const current = await databases.getCollection(databaseId, eventsId);
  const permissions = [
    Permission.read(ANY),
    Permission.create(ADMIN),
    Permission.update(ADMIN),
    Permission.delete(ADMIN),
  ];
  await databases.updateCollection(
    databaseId,
    eventsId,
    current.name,
    permissions,
    current.documentSecurity,
    current.enabled,
  );
  console.log(`  ok: ${JSON.stringify(permissions)}`);
}

async function updateContactCollection() {
  console.log(`\n→ contact collection (${contactId})`);
  const current = await databases.getCollection(databaseId, contactId);
  // Public can submit (create), only admins can read/update/delete.
  const permissions = [
    Permission.create(ANY),
    Permission.read(ADMIN),
    Permission.update(ADMIN),
    Permission.delete(ADMIN),
  ];
  await databases.updateCollection(
    databaseId,
    contactId,
    current.name,
    permissions,
    current.documentSecurity,
    current.enabled,
  );
  console.log(`  ok: ${JSON.stringify(permissions)}`);
}

async function updateBucket() {
  console.log(`\n→ bucket (${bucketId})`);
  const current = await storage.getBucket(bucketId);
  const permissions = [
    Permission.read(ANY),
    Permission.create(ADMIN),
    Permission.update(ADMIN),
    Permission.delete(ADMIN),
  ];
  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB — matches the client-side cap
  const ALLOWED_EXT = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "mp4",
    "mov",
    "webm",
    "m4v",
  ];
  await storage.updateBucket(
    bucketId,
    current.name,
    permissions,
    current.fileSecurity,
    current.enabled,
    MAX_FILE_SIZE,
    ALLOWED_EXT,
    current.compression,
    current.encryption,
    current.antivirus,
  );
  console.log(`  ok: ${JSON.stringify(permissions)}`);
  console.log(`  maximumFileSize=${MAX_FILE_SIZE} (500MB)`);
  console.log(`  allowedFileExtensions=${JSON.stringify(ALLOWED_EXT)}`);
}

(async () => {
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Project:  ${projectId}`);
  await updateEventsCollection();
  await updateContactCollection();
  await updateBucket();
  console.log("\nAll updates applied. Re-run inspect-appwrite.js to verify.");
})().catch((e) => {
  console.error("\nFatal:", e.message);
  if (e.response) console.error(e.response);
  process.exit(1);
});
