import { verifyAuthToken } from "@/lib/auth";
import { sendMeetupEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = verifyAuthToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized or invalid token" },
        { status: 401 }
      );
    }

    const { userId, eventId } = await request.json();

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { cafe: true },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Booking rules
    const now = new Date();
    const diffHrs =
      (new Date(event.date).getTime() - now.getTime()) / (1000 * 60 * 60);
    if (diffHrs < 48 || (event.bookingClose && now > event.bookingClose)) {
      return NextResponse.json(
        { message: "Booking closed for this event" },
        { status: 400 }
      );
    }

    // Already joined?
    const existing = await prisma.eventParticipant.findFirst({
      where: { userId, eventId },
    });
    if (existing) {
      return NextResponse.json(
        { message: "User already joined this event" },
        { status: 400 }
      );
    }

    // Check user subscription
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (dbUser.subscriptionActive) {
      if (dbUser.subscriptionCredits > 0) {
        // Deduct one credit
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionCredits: dbUser.subscriptionCredits - 1,
            subscriptionActive: dbUser.subscriptionCredits - 1 > 0,
          },
        });
      } else {
        return NextResponse.json(
          { message: "No subscription credits left. Please renew." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "No active subscription. Please pay for this event." },
        { status: 400 }
      );
    }

    // Add participant
    const participant = await prisma.eventParticipant.create({
      data: { userId, eventId, status: "Active" },
      include: { user: true },
    });

    // Send email
    await sendMeetupEmail({
      to: participant.user.email,
      groupNames: participant.user.name,
      date: event.date.toISOString(),
      cafe: {
        name: event.cafe?.name || "Cafe",
        address: event.cafe?.address || "Address not available",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Event joined successfully. ${
        dbUser.subscriptionCredits - 1
      } credits left.`,
      participant,
    });
  } catch (err: any) {
    console.error("Join event error:", err);
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
