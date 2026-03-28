import { Query } from "node-appwrite";
import { getServerDatabases } from "./appwriteServer";
import type { Event } from "./eventModel";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const EVENTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_TABLE_ID || "";

function mapListDoc(doc: Record<string, unknown>): Event {
  return {
    $id: doc.$id as string,
    name: doc.name as string,
    chineseName: doc.chineseName as string,
    date: doc.date as string,
    category: doc.category as Event["category"],
    images: JSON.parse((doc.images as string) || "[]"),
    thumbnail: (doc.thumbnail as string) || undefined,
  };
}

function parseImagesField(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === "string") {
    if (raw.startsWith("[") || raw.startsWith("{")) {
      try {
        return JSON.parse(raw);
      } catch {
        return [raw];
      }
    }
    return [raw];
  }
  return [];
}

function mapFullDoc(doc: Record<string, unknown>): Event {
  return {
    $id: doc.$id as string,
    name: doc.name as string,
    chineseName: doc.chineseName as string,
    date: doc.date as string,
    category: doc.category as Event["category"],
    images: parseImagesField(doc.images),
    thumbnail: (doc.thumbnail as string) || undefined,
    isVideo: Boolean(doc.isVideo),
  };
}

export async function listEventsByCategoryServer(
  category: "recent" | "past",
): Promise<Event[]> {
  const databases = getServerDatabases();
  const response = await databases.listDocuments(
    DATABASE_ID,
    EVENTS_TABLE_ID,
    [
      Query.equal("category", category),
      Query.orderDesc("date"),
      Query.limit(100),
    ],
  );
  return response.documents.map((d) => mapListDoc(d as Record<string, unknown>));
}

export async function getEventServer(id: string): Promise<Event> {
  const databases = getServerDatabases();
  const response = await databases.getDocument(
    DATABASE_ID,
    EVENTS_TABLE_ID,
    id,
  );
  return mapFullDoc(response as Record<string, unknown>);
}
