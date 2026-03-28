import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export { client };

// Database and Table IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const EVENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID || '';
export const CONTACTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_TABLE_ID || '';
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '';