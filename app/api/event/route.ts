import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";

// Helper: Get next N Sundays at 10 AM
function getNextSundays(count: number): Date[] {
  const sundays: Date[] = [];
  const now = new Date();
  let nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  nextSunday.setHours(10, 0, 0, 0); // 10 AM

  for (let i = 0; i < count; i++) {
    const newDate = new Date(nextSunday);
    newDate.setDate(nextSunday.getDate() + i * 7);
    sundays.push(newDate);
  }

  return sundays;
}

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAuthToken(request);

    // ✅ Ensure only admins can create events
    if (!auth?.adminId) {
      return NextResponse.json(
        { message: "Only admins can create events" },
        { status: 403 }
      );
    }

    const adminId = auth.adminId;
    const locations = await prisma.location.findMany();

    if (locations.length === 0) {
      return NextResponse.json({ message: "No locations found" }, { status: 400 });
    }

    const sundays = getNextSundays(4);
    const createdEvents = [];

    for (const location of locations) {
      for (const sunday of sundays) {
        // Check for existing event to avoid duplicates
        const existing = await prisma.event.findFirst({
          where: {
            date: sunday,
            locationId: location.id,
          },
        });

        if (existing) continue;

        // ✅ Booking opens 3 weeks before the event
        const bookingOpen = new Date(sunday);
        bookingOpen.setDate(sunday.getDate() - 21);
        bookingOpen.setHours(10, 0, 0, 0);

        // ✅ Booking closes Friday 10 AM before the Sunday event
        const bookingClose = new Date(sunday);
        bookingClose.setDate(sunday.getDate() - 2); // Friday before Sunday
        bookingClose.setHours(10, 0, 0, 0);

        // ✅ Create the event
        const event = await prisma.event.create({
          data: {
            date: sunday,
            city: location.city,
            country: location.country,
            createdBy: adminId,
            locationId: location.id,
            bookingOpen,
            bookingClose,
            status: "Open",
          },
        });

        createdEvents.push(event);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Events created for all locations for next 4 Sundays",
      createdCount: createdEvents.length,
      events: createdEvents,
    });
  } catch (err: any) {
    console.error("Error creating events:", err);
    return NextResponse.json(
      { message: "Failed to create events", error: err.message },
      { status: 500 }
    );
  }
}
