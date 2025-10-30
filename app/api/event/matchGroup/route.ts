// app/api/event/matchGroup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMeetupEmail } from "@/lib/mailer";
import { formEventGroups } from "@/lib/matchGroup";

export async function GET() {
  try {
    const now = new Date();
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const events = await prisma.event.findMany({
      where: {
        date: { lte: in48h },
        isClosed: false,
      },
      include: {
        cafe: true,
      },
    });

    for (const event of events) {
      // 🔹 If no cafe is assigned yet, assign one automatically
      let cafe = event.cafe;
      if (!cafe) {
        const availableCafes = await prisma.cafe.findMany({
          where: { location: { city: event.city } },
        });

        if (availableCafes.length > 0) {
          const randomCafe =
            availableCafes[Math.floor(Math.random() * availableCafes.length)];

          await prisma.event.update({
            where: { id: event.id },
            data: { cafeId: randomCafe.id },
          });

          cafe = randomCafe;
        }
      }

      // 🔹 Form groups and send emails
      const groups = await formEventGroups(event.id);

      for (const group of groups) {
        const to = group.map((u) => u.email);
        const groupNames = group.map((u) => u.name).join(", ");

        await sendMeetupEmail({
          to,
          groupNames,
          date: event.date.toISOString(),
          cafe: {
            name: cafe?.name || "To be announced",
            address: cafe?.address || "Address will be shared soon",
          },
        });
      }

      // 🔹 Close the event
      await prisma.event.update({
        where: { id: event.id },
        data: { isClosed: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Groups formed, cafés assigned, and emails sent",
    });
  } catch (err: any) {
    console.error("Group matching error:", err);
    return NextResponse.json(
      { error: "Failed to form groups or send emails", details: err.message },
      { status: 500 }
    );
  }
}
