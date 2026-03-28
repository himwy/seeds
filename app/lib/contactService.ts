import { databases, DATABASE_ID } from "./appwrite";

// Contact table ID - you'll need to create this collection in Appwrite
export const CONTACTS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_TABLE_ID || '';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const contactService = {
  /** Submits via /api/contact so production is not blocked by Appwrite CORS. */
  async submitContactForm(formData: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return {
          success: false,
          error: err.error || response.statusText,
        };
      }
      const data = await response.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error submitting contact form:", error);
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
