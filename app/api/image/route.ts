import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime for Buffer support and better caching
export const runtime = "nodejs";

/**
 * Image Proxy API Route
 * 
 * Proxies images from Appwrite storage through Next.js, adding:
 * - Aggressive cache headers (1 year for immutable content)
 * - Proper Content-Type headers
 * - Browser-side caching via Cache-Control
 * - Edge/CDN caching compatibility
 * 
 * This solves the Appwrite speed issue by:
 * 1. Caching responses in the browser for 1 year
 * 2. Allowing Vercel/CDN edge caching
 * 3. Avoiding repeated round-trips to Appwrite servers
 * 
 * Usage: /api/image?url=<appwrite_url>
 */

// In-memory cache for responses (Node.js process level)
const memoryCache = new Map<string, { data: ArrayBuffer; contentType: string; size: number; timestamp: number }>();
const MEMORY_CACHE_MAX_SIZE = 100; // Max items in memory cache
const MEMORY_CACHE_TTL = 3600000; // 1 hour in ms

function cleanMemoryCache() {
  const now = Date.now();
  for (const [key, value] of memoryCache) {
    if (now - value.timestamp > MEMORY_CACHE_TTL) {
      memoryCache.delete(key);
    }
  }
  // If still over limit, remove oldest entries
  if (memoryCache.size > MEMORY_CACHE_MAX_SIZE) {
    const entries = [...memoryCache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, entries.length - MEMORY_CACHE_MAX_SIZE);
    for (const [key] of toRemove) {
      memoryCache.delete(key);
    }
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Validate the URL is from Appwrite
  if (!url.includes("cloud.appwrite.io") && !url.includes("appwrite.io")) {
    return NextResponse.json({ error: "Only Appwrite URLs are allowed" }, { status: 403 });
  }

  try {
    // Check memory cache first
    const cached = memoryCache.get(url);
    if (cached && Date.now() - cached.timestamp < MEMORY_CACHE_TTL) {
      return new Response(cached.data, {
        status: 200,
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "CDN-Cache-Control": "public, max-age=31536000",
          "Content-Length": cached.size.toString(),
          "X-Cache": "HIT",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Fetch from Appwrite
    const response = await fetch(url, {
      headers: {
        "Accept": "image/webp,image/avif,image/*,*/*",
      },
      // Allow fetch to follow redirects
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Store in memory cache
    cleanMemoryCache();
    memoryCache.set(url, { data: arrayBuffer, contentType, size: arrayBuffer.byteLength, timestamp: Date.now() });

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Aggressive caching: 1 year, immutable (content doesn't change for same file ID)
        "Cache-Control": "public, max-age=31536000, immutable",
        // CDN-specific cache headers
        "CDN-Cache-Control": "public, max-age=31536000",
        // Vercel-specific
        "Vercel-CDN-Cache-Control": "public, max-age=31536000",
        "X-Cache": "MISS",
        "Access-Control-Allow-Origin": "*",
        // Content length for efficient streaming
        "Content-Length": arrayBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
