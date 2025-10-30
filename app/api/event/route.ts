import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth";

function getNextSundays(count: number): Date[] {
  const sundays: Date[] = [];
  const now = new Date();
  let nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  nextSunday.setHours(10, 0, 0, 0);
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

    // ✅ detect if the token is from an admin
    if (!auth?.adminId) {
      return NextResponse.json(
        { message: "Only admins can create events" },
        { status: 403 }
      );
    }

    const adminId = auth.adminId; // ✅ now defined
    const locations = await prisma.location.findMany();
    if (locations.length === 0) {
      return NextResponse.json({ message: "No locations found" }, { status: 400 });
    }

    const sundays = getNextSundays(4);
    const createdEvents = [];

    for (const location of locations) {
      for (const sunday of sundays) {
        const existing = await prisma.event.findFirst({
          where: {
            date: sunday,
            city: location.city,
            country: location.country,
          },
        });

        if (existing) continue;

        const event = await prisma.event.create({
          data: {
            date: sunday,
            city: location.city,
            country: location.country,
            createdBy: adminId,
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
