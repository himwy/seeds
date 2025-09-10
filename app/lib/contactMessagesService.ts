import { databases, DATABASE_ID } from './appwrite';
import { ID, Query } from 'appwrite';
import type { Models } from 'appwrite';

// Contact messages table ID - matches the one we created
export const CONTACTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_TABLE_ID || 'contact';

export interface ContactMessage extends Models.Document {
  name: string;
  email: string;
  message: string;
  isRead?: boolean;
  isArchived?: boolean;
}

export interface ContactFilters {
  status: 'all' | 'unread' | 'read' | 'archived';
  sortBy: 'newest' | 'oldest';
}

export class ContactMessagesService {
  
  // Get all contact messages with filtering
  static async getContactMessages(filters: ContactFilters = { status: 'all', sortBy: 'newest' }): Promise<ContactMessage[]> {
    try {
      const queries = [];
      
      // Add status filter
      if (filters.status === 'unread') {
        queries.push(Query.equal('isRead', false));
      } else if (filters.status === 'read') {
        queries.push(Query.equal('isRead', true));
      } else if (filters.status === 'archived') {
        queries.push(Query.equal('isArchived', true));
      } else {
        // For 'all', show non-archived messages
        queries.push(Query.notEqual('isArchived', true));
      }
      
      // Add sorting
      if (filters.sortBy === 'oldest') {
        queries.push(Query.orderAsc('$createdAt'));
      } else {
        queries.push(Query.orderDesc('$createdAt'));
      }
      
      // Limit to reasonable number
      queries.push(Query.limit(100));
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        queries
      );
      
      return response.documents as unknown as ContactMessage[];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  }
  
  // Mark message as read
  static async markAsRead(messageId: string): Promise<ContactMessage> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        messageId,
        { isRead: true }
      );
      
      return response as unknown as ContactMessage;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }
  
  // Mark message as unread
  static async markAsUnread(messageId: string): Promise<ContactMessage> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        messageId,
        { isRead: false }
      );
      
      return response as unknown as ContactMessage;
    } catch (error) {
      console.error('Error marking message as unread:', error);
      throw error;
    }
  }
  
  // Archive message
  static async archiveMessage(messageId: string): Promise<ContactMessage> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        messageId,
        { isArchived: true }
      );
      
      return response as unknown as ContactMessage;
    } catch (error) {
      console.error('Error archiving message:', error);
      throw error;
    }
  }
  
  // Delete message permanently
  static async deleteMessage(messageId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        messageId
      );
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
  
  // Get message count by status
  static async getMessageCounts(): Promise<{
    total: number;
    unread: number;
    read: number;
    archived: number;
  }> {
    try {
      const [total, unread, read, archived] = await Promise.all([
        databases.listDocuments(DATABASE_ID, CONTACTS_TABLE_ID, [
          Query.notEqual('isArchived', true),
          Query.limit(1)
        ]),
        databases.listDocuments(DATABASE_ID, CONTACTS_TABLE_ID, [
          Query.equal('isRead', false),
          Query.notEqual('isArchived', true),
          Query.limit(1)
        ]),
        databases.listDocuments(DATABASE_ID, CONTACTS_TABLE_ID, [
          Query.equal('isRead', true),
          Query.notEqual('isArchived', true),
          Query.limit(1)
        ]),
        databases.listDocuments(DATABASE_ID, CONTACTS_TABLE_ID, [
          Query.equal('isArchived', true),
          Query.limit(1)
        ])
      ]);
      
      return {
        total: total.total,
        unread: unread.total,
        read: read.total,
        archived: archived.total
      };
    } catch (error) {
      console.error('Error getting message counts:', error);
      return { total: 0, unread: 0, read: 0, archived: 0 };
    }
  }
}
