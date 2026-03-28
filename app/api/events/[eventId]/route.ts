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
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (e) {
    console.error("[api/events/[eventId]]", e);
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}
