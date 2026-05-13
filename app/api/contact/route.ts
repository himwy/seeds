import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getServerDatabases } from "@/app/lib/appwriteServer";
import {
  CONTACTS_TABLE_ID,
  type ContactFormData,
} from "@/app/lib/contactService";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

// Rate limit: 5 submissions per minute per IP. Lazy-initialized so missing
// Upstash env vars don't break the route — limiter just no-ops until you
// configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
let ratelimit: Ratelimit | null = null;
function getRateLimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "seeds:contact",
  });
  return ratelimit;
}

function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for; first entry is the client IP.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  // Rate-limit first — cheap, blocks spam before we touch the DB.
  const limiter = getRateLimiter();
  if (limiter) {
    const ip = getClientIp(request);
    const { success, limit, remaining, reset } = await limiter.limit(ip);
    if (!success) {
      const retryAfter = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a moment and try again.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": String(remaining),
            "X-RateLimit-Reset": String(reset),
            "Retry-After": String(retryAfter),
          },
        },
      );
    }
  }

  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;
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

  // Length limits to prevent abuse / DB bloat
  const trimmedName = name.trim().slice(0, 200);
  const trimmedEmail = email.trim().slice(0, 320);
  const trimmedMessage = message.trim().slice(0, 5000);

  // Basic email shape check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Invalid email address" },
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
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        // Server-controlled timestamp — do NOT accept from client
        createdAt: new Date().toISOString(),
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
