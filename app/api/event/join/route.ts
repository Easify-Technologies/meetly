
import { verifyAuthToken } from "@/lib/auth";
import { sendMeetupEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const user = verifyAuthToken(request);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized or invalid token" }, { status: 401 });
        }

        const { userId, eventId } = await request.json();

        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { cafe: true },
        });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        // Check 48-hour rule
        const now = new Date();
        const diffHrs =
            (new Date(event.date).getTime() - now.getTime()) / (1000 * 60 * 60);
        if (diffHrs < 48) {
            return NextResponse.json(
                { message: "Booking closed for this event" },
                { status: 400 }
            );
        }

        // Check if already joined
        const existing = await prisma.eventParticipant.findFirst({
            where: { userId, eventId },
        });
        if (existing)
            return NextResponse.json(
                { message: "User already joined this event" },
                { status: 400 }
            );

        // Add participant
        const participant = await prisma.eventParticipant.create({
            data: { userId, eventId },
            include: { user: true },
        });

        await sendMeetupEmail({
            to: participant.user.email,
            groupNames: participant.user.name,
            date: event.date.toISOString(), // ✅ string
            cafe: {
                name: event.cafe?.name || "Cafe",
                address: event.cafe?.address || "Address not available",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Event joined successfully. Confirmation email sent.",
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
