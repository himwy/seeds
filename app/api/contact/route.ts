import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { getServerDatabases } from "@/app/lib/appwriteServer";
import {
  CONTACTS_TABLE_ID,
  type ContactFormData,
} from "@/app/lib/contactService";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

export async function POST(request: NextRequest) {
  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, createdAt } = body;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 },
    );
  }

  if (!CONTACTS_TABLE_ID || !DATABASE_ID) {
    return NextResponse.json(
      { error: "Server contact collection is not configured" },
      { status: 500 },
    );
  }

  try {
    const databases = getServerDatabases();
    const doc = await databases.createDocument(
      DATABASE_ID,
      CONTACTS_TABLE_ID,
      ID.unique(),
      {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: createdAt || new Date().toISOString(),
        isRead: false,
        isArchived: false,
      },
    );
    return NextResponse.json({ success: true, data: doc });
  } catch (e) {
    console.error("[api/contact]", e);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}
