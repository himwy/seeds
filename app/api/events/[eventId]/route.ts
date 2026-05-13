import { NextRequest, NextResponse } from "next/server";
import { getEventServer } from "@/app/lib/eventsServerDb";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await context.params;
  if (!eventId) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  try {
    const event = await getEventServer(eventId);
    return NextResponse.json(event, {
      headers: {
        // Short TTL so admin edits (e.g. uploading a thumbnail) appear
        // on the public album page within seconds instead of after a minute.
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
      },
    });
  } catch (e) {
    console.error("[api/events/[eventId]]", e);
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}
