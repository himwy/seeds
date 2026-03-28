import {
  databases,
  DATABASE_ID,
  EVENTS_TABLE_ID,
  storage,
  STORAGE_BUCKET_ID,
} from "./appwrite";
import { ID, Query } from "appwrite";
import type { Event } from "./eventModel";

export type { Event } from "./eventModel";

export class EventsService {
  // Get events by category (via same-origin API to avoid browser CORS to Appwrite)
  static async getEventsByCategory(
    category: "recent" | "past",
  ): Promise<Event[]> {
    try {
      const res = await fetch(
        `/api/events?category=${encodeURIComponent(category)}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Failed to fetch events (${res.status})`);
      }
      const data = (await res.json()) as { documents: Event[] };
      return data.documents;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  // Get all events for admin
  static async getAllEvents(): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        [Query.orderDesc("date"), Query.limit(150)]
      );
      return response.documents.map((doc) => ({
        $id: doc.$id,
        name: doc.name,
        chineseName: doc.chineseName,
        date: doc.date,
        category: doc.category,
        images: JSON.parse(doc.images || "[]"),
        thumbnail: doc.thumbnail || undefined,
        isVideo: doc.isVideo || false,
      })) as Event[];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  // Get single event (same-origin API; avoids CORS)
  static async getEvent(id: string): Promise<Event> {
    try {
      const res = await fetch(`/api/events/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch event (${res.status})`);
      }
      return (await res.json()) as Event;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  }

  // Create new event
  static async createEvent(eventData: Omit<Event, "$id">): Promise<Event> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        ID.unique(),
        {
          ...eventData,
          images: JSON.stringify(eventData.images),
          thumbnail: eventData.thumbnail || null,
          isVideo: eventData.isVideo || false,
        }
      );
      return {
        $id: response.$id,
        name: response.name,
        chineseName: response.chineseName,
        date: response.date,
        category: response.category,
        images: JSON.parse(response.images || "[]"),
        thumbnail: response.thumbnail || undefined,
        isVideo: response.isVideo || false,
      } as Event;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  // Update event
  static async updateEvent(
    id: string,
    eventData: Partial<Event>
  ): Promise<Event> {
    try {
      const updateData: Record<string, unknown> = { ...eventData };
      if (updateData.images) {
        updateData.images = JSON.stringify(updateData.images);
      }
      // Handle thumbnail - use null for empty string to clear it
      if ('thumbnail' in updateData) {
        updateData.thumbnail = updateData.thumbnail || null;
      }

      const response = await databases.updateDocument(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        id,
        updateData
      );

      return {
        $id: response.$id,
        name: response.name,
        chineseName: response.chineseName,
        date: response.date,
        category: response.category,
        images: JSON.parse(response.images || "[]"),
        thumbnail: response.thumbnail || undefined,
        isVideo: response.isVideo || false,
      } as Event;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }

  // Delete event
  static async deleteEvent(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, EVENTS_TABLE_ID, id);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }

  // Upload multiple images and videos with better error handling
  static async uploadImages(files: File[]): Promise<string[]> {
    try {
      if (!STORAGE_BUCKET_ID) {
        throw new Error(
          "Storage bucket ID is not configured. Please check your environment variables."
        );
      }

      const uploadPromises = files.map(async (file) => {
        try {
          const response = await storage.createFile(
            STORAGE_BUCKET_ID,
            ID.unique(),
            file
          );

          // Use /view endpoint for direct file access without transformations
          // /view serves raw files and does NOT count against Appwrite transformation quotas
          const fileUrl = storage
            .getFileView(STORAGE_BUCKET_ID, response.$id)
            .toString();
          return fileUrl;
        } catch (error: unknown) {
          console.error(`Error uploading file ${file.name}:`, error);

          // Provide more specific error messages
          const errorObj = error as { code?: number; message?: string };
          if (errorObj.code === 404) {
            throw new Error(
              `Storage bucket not found. Please verify bucket ID: ${STORAGE_BUCKET_ID}`
            );
          } else if (errorObj.code === 401) {
            throw new Error(
              "Unauthorized to upload files. Please check storage permissions."
            );
          } else {
            throw new Error(
              `Failed to upload ${file.name}: ${
                errorObj.message || "Unknown error"
              }`
            );
          }
        }
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  }

  // Delete image file from Appwrite storage
  static async deleteImageFile(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error("Error deleting image file:", error);
      // Don't throw, allow event/image update to continue
    }
  }

  // Delete event and all associated images from Appwrite storage
  static async deleteEventWithImages(eventId: string): Promise<void> {
    try {
      // Get event
      const event = await this.getEvent(eventId);
      // Delete all images
      for (const imageUrl of event.images) {
        const match = imageUrl.match(/\/files\/(.*?)\//);
        const fileId = match ? match[1] : null;
        if (fileId) {
          await this.deleteImageFile(fileId);
        }
      }
      // Delete event document
      await this.deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event and images:", error);
      throw error;
    }
  }

  // Validate configuration
  static validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!DATABASE_ID) {
      errors.push("Database ID is missing from environment variables");
    }

    if (!EVENTS_TABLE_ID) {
      errors.push("Events table ID is missing from environment variables");
    }

    if (!STORAGE_BUCKET_ID) {
      errors.push("Storage bucket ID is missing from environment variables");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Get count of events by category
  static async getEventsCount(category?: "recent" | "past"): Promise<number> {
    try {
      const queries = category ? [Query.equal("category", category)] : [];
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        queries
      );
      return response.total;
    } catch (error) {
      console.error("Error counting events:", error);
      return 0;
    }
  }

  // Generate direct image URL without transformations
  static getImageUrl(fileId: string): string {
    try {
      if (!STORAGE_BUCKET_ID || !fileId) {
        return "/placeholder-image.jpg"; // fallback image
      }

      // Use /view for direct access without any transformations (no quota usage)
      return storage.getFileView(STORAGE_BUCKET_ID, fileId).toString();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "/placeholder-image.jpg"; // fallback image
    }
  }

  /**
   * Convert an Appwrite URL to use the image proxy for better caching/speed.
   * The proxy adds aggressive Cache-Control headers and in-memory caching.
   * Use this for thumbnail/gallery display; skip for downloads/fullscreen.
   */
  static getProxiedUrl(url: string): string {
    if (!url || !url.includes('appwrite.io')) return url;
    return `/api/image?url=${encodeURIComponent(url)}`;
  }

  // Convert old transformation URLs to direct view URLs to avoid transformation limits
  static convertUrlToDirectView(url: string): string {
    try {
      // If it's already a direct view URL, return as is
      if (url.includes("/view") && !url.includes("/preview")) {
        return url;
      }

      // If it's a transformation URL (contains /preview), convert to /view
      if (url.includes("/preview")) {
        // Extract file ID from the URL
        const urlParts = url.split("/");
        const filesIndex = urlParts.indexOf("files");
        if (filesIndex !== -1 && urlParts[filesIndex + 1]) {
          const fileId = urlParts[filesIndex + 1];
          const bucketId = urlParts[filesIndex - 1];

          // Reconstruct as direct view URL and preserve query parameters
          const baseUrl = url.split("/v1/")[0];
          const urlObj = new URL(url);
          const projectParam = urlObj.searchParams.get("project");
          let newUrl = `${baseUrl}/v1/storage/buckets/${bucketId}/files/${fileId}/view`;
          if (projectParam) {
            newUrl += `?project=${projectParam}`;
          }
          return newUrl;
        }
      }

      // If we can't convert it, return the original (might be external URL)
      return url;
    } catch (error) {
      console.error("Error converting URL:", error);
      return url;
    }
  }

  // Convert URLs to proper download format for file downloads
  static convertUrlToDirectDownload(url: string): string {
    try {
      // If it's an Appwrite URL, convert to download endpoint
      if (url.includes("cloud.appwrite.io") && url.includes("/files/")) {
        const urlParts = url.split("/");
        const filesIndex = urlParts.indexOf("files");
        if (filesIndex !== -1 && urlParts[filesIndex + 1]) {
          const fileId = urlParts[filesIndex + 1];
          const bucketId = urlParts[filesIndex - 1];

          // Reconstruct as download URL and preserve query parameters
          const baseUrl = url.split("/v1/")[0];
          const urlObj = new URL(url);
          const projectParam = urlObj.searchParams.get("project");
          let downloadUrl = `${baseUrl}/v1/storage/buckets/${bucketId}/files/${fileId}/download`;
          if (projectParam) {
            downloadUrl += `?project=${projectParam}`;
          }
          return downloadUrl;
        }
      }

      // If we can't convert it, return the original
      return url;
    } catch (error) {
      console.error("Error converting download URL:", error);
      return url;
    }
  }
}
