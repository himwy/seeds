import { databases, DATABASE_ID, EVENTS_TABLE_ID, storage, STORAGE_BUCKET_ID } from './appwrite';
import { ID, Query, ImageGravity } from 'appwrite';

export interface Event {
  $id?: string;
  name: string; // English name
  chineseName: string; // Chinese name
  images: string[]; // Array of image URLs
  date: string;
  category: 'recent' | 'past'; // Simple category
}

export class EventsService {
  // Get events by category
  static async getEventsByCategory(category: 'recent' | 'past'): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        [
          Query.equal('category', category),
          Query.orderDesc('date'),
          Query.limit(50)
        ]
      );
      return response.documents.map(doc => ({
        $id: doc.$id,
        name: doc.name,
        chineseName: doc.chineseName,
        date: doc.date,
        category: doc.category,
        images: JSON.parse(doc.images || '[]')
      })) as Event[];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // Get all events for admin
  static async getAllEvents(): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        [
          Query.orderDesc('date'),
          Query.limit(100)
        ]
      );
      return response.documents.map(doc => ({
        $id: doc.$id,
        name: doc.name,
        chineseName: doc.chineseName,
        date: doc.date,
        category: doc.category,
        images: JSON.parse(doc.images || '[]')
      })) as Event[];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // Get single event
  static async getEvent(id: string): Promise<Event> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        id
      );
      
      // Handle different types of image data from database
      let images: string[] = [];
      if (response.images) {
        if (Array.isArray(response.images)) {
          // Already an array
          images = response.images;
        } else if (typeof response.images === 'string') {
          // Check if it's a JSON string or a single URL
          if (response.images.startsWith('[') || response.images.startsWith('{')) {
            try {
              images = JSON.parse(response.images);
            } catch (parseError) {
              console.warn('Failed to parse images as JSON:', parseError);
              // If JSON parsing fails, treat as single URL
              images = [response.images];
            }
          } else {
            // Single URL string
            images = [response.images];
          }
        }
      }
      
      return {
        $id: response.$id,
        name: response.name,
        chineseName: response.chineseName,
        date: response.date,
        category: response.category,
        images
      } as Event;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }

  // Create new event
  static async createEvent(eventData: Omit<Event, '$id'>): Promise<Event> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        ID.unique(),
        {
          ...eventData,
          images: JSON.stringify(eventData.images)
        }
      );
      return {
        $id: response.$id,
        name: response.name,
        chineseName: response.chineseName,
        date: response.date,
        category: response.category,
        images: JSON.parse(response.images || '[]')
      } as Event;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Update event
  static async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    try {
      const updateData: Record<string, unknown> = { ...eventData };
      if (updateData.images) {
        updateData.images = JSON.stringify(updateData.images);
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
        images: JSON.parse(response.images || '[]')
      } as Event;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  // Delete event
  static async deleteEvent(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        EVENTS_TABLE_ID,
        id
      );
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Upload multiple images with better error handling
  static async uploadImages(files: File[]): Promise<string[]> {
    try {
      if (!STORAGE_BUCKET_ID) {
        throw new Error('Storage bucket ID is not configured. Please check your environment variables.');
      }

      const uploadPromises = files.map(async (file) => {
        try {
          const response = await storage.createFile(
            STORAGE_BUCKET_ID,
            ID.unique(),
            file
          );
          
          // Generate public file URL
          const fileUrl = storage.getFileView(
            STORAGE_BUCKET_ID,
            response.$id
          ).toString();
          
          return fileUrl;
        } catch (error: unknown) {
          console.error(`Error uploading file ${file.name}:`, error);
          
          // Provide more specific error messages
          const errorObj = error as { code?: number; message?: string };
          if (errorObj.code === 404) {
            throw new Error(`Storage bucket not found. Please verify bucket ID: ${STORAGE_BUCKET_ID}`);
          } else if (errorObj.code === 401) {
            throw new Error('Unauthorized to upload files. Please check storage permissions.');
          } else {
            throw new Error(`Failed to upload ${file.name}: ${errorObj.message || 'Unknown error'}`);
          }
        }
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  // Delete image file from Appwrite storage
  static async deleteImageFile(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error deleting image file:', error);
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
      console.error('Error deleting event and images:', error);
      throw error;
    }
  }

  // Validate configuration
  static validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!DATABASE_ID) {
      errors.push('Database ID is missing from environment variables');
    }
    
    if (!EVENTS_TABLE_ID) {
      errors.push('Events table ID is missing from environment variables');
    }
    
    if (!STORAGE_BUCKET_ID) {
      errors.push('Storage bucket ID is missing from environment variables');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}