import { Client, Databases } from "node-appwrite";

/**
 * Server-only Appwrite client (API key). Avoids browser CORS: call from Route Handlers only.
 * Set APPWRITE_API_KEY in Vercel / .env.local (scoped key: Databases read/write as needed).
 */
export function getServerDatabases(): Databases {
  const endpoint =
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    "https://cloud.appwrite.io/v1";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
  const apiKey = process.env.APPWRITE_API_KEY || "";

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set");
  }
  if (!apiKey) {
    throw new Error(
      "APPWRITE_API_KEY is not set. Create an API key in Appwrite (Settings → API keys) and add it to your deployment env.",
    );
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return new Databases(client);
}
