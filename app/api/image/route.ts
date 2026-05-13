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

// Allowlist of hostnames we will proxy. Substring matching is unsafe (SSRF):
// `?url=https://attacker.com/?x=appwrite.io` would have passed an `includes` check.
const ALLOWED_HOSTS = new Set(["cloud.appwrite.io"]);

function isAllowedAppwriteUrl(raw: string): URL | null {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  const host = parsed.hostname.toLowerCase();
  if (ALLOWED_HOSTS.has(host)) return parsed;
  // Allow any *.appwrite.io subdomain in case of region-specific endpoints,
  // but require the suffix match (not substring) so attacker.com.appwrite.io
  // is also caught by the explicit endsWith check (it would match — that's
  // why the suffix must be ".appwrite.io" with the leading dot).
  if (host === "appwrite.io" || host.endsWith(".appwrite.io")) return parsed;
  return null;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Strict hostname allowlist — closes the SSRF hole that a substring check left open.
  const parsed = isAllowedAppwriteUrl(url);
  if (!parsed) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
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

    // Fetch from Appwrite with a short timeout so slow/hung upstreams can't
    // tie up the route handler. redirect:"manual" prevents a 302 from
    // bouncing us to an unallowed host post-validation.
    const response = await fetch(parsed.toString(), {
      headers: {
        "Accept": "image/webp,image/avif,image/*,*/*",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    // Reject large responses so the proxy can't be used to pull multi-MB videos
    // through our server. 25MB cap — generous for images, blocks abuse.
    const MAX_BYTES = 25 * 1024 * 1024;
    const declaredLength = Number(response.headers.get("content-length") || 0);
    if (declaredLength && declaredLength > MAX_BYTES) {
      return NextResponse.json(
        { error: "Resource too large for proxy" },
        { status: 413 }
      );
    }
    const contentType = response.headers.get("content-type") || "image/jpeg";
    // Only proxy image content types — videos / arbitrary blobs should hit Appwrite directly
    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image content types are proxied" },
        { status: 415 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_BYTES) {
      return NextResponse.json(
        { error: "Resource too large for proxy" },
        { status: 413 }
      );
    }

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
