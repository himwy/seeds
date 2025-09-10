import { databases, DATABASE_ID } from './appwrite';
import { ID } from 'appwrite';

// Contact table ID - you'll need to create this collection in Appwrite
export const CONTACTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_TABLE_ID || '';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const contactService = {
  // Submit contact form to Appwrite
  async submitContactForm(formData: ContactFormData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        CONTACTS_TABLE_ID,
        ID.unique(),
        {
          ...formData,
          isRead: false,
          isArchived: false
        }
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error };
    }
  },

  // Get all contact submissions (for admin panel)
  async getContacts() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONTACTS_TABLE_ID
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return { success: false, error };
    }
  }
};
