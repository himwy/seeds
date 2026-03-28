import { NextRequest, NextResponse } from "next/server";
import { listEventsByCategoryServer } from "@/app/lib/eventsServerDb";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  if (category !== "recent" && category !== "past") {
    return NextResponse.json(
      { error: "Query ?category=recent|past is required" },
      { status: 400 },
    );
  }

  try {
    const documents = await listEventsByCategoryServer(category);
    return NextResponse.json(
      { documents },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (e) {
    console.error("[api/events]", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to load events", detail: message },
      { status: 500 },
    );
  }
}
