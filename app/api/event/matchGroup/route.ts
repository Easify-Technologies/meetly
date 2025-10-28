import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { formEventGroups } from "@/lib/matchGroups";
import { sendMeetupEmail } from "@/lib/mailer";
import { formEventGroups } from "@/lib/matchGroup";

export async function GET() {
  try {
    const now = new Date();
    const inNDays = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

    const in2Days = inNDays(2);

    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: in2Days,
        },
        isClosed: false,
      },
      include: {
        cafe: true,
      }
    });

    for (const event of events) {
      const groups = await formEventGroups(event.id);

      for (const group of groups) {
        const to = group.map((u) => u.email);
        const groupNames = group.map((u) => u.name).join(", ");

        await sendMeetupEmail({
          to,
          groupNames,
          cafe: {
            name: event.cafe?.name || "Unknown Café",
            address: event.cafe?.address || "TBD",
          },
          date: event.date.toISOString(),
        });
      }

      // Close booking
      // await prisma.event.update({
      //   where: { id: event.id },
      //   data: { isClosed: true },
      // });
    }

    return NextResponse.json({
      events,
      success: true,
      message: "Groups formed and emails sent",
    });
  } catch (err: any) {
    console.error("Group matching error:", err);
    return NextResponse.json(
      { error: "Failed to send group match emails", details: err.message },
      { status: 500 }
    );
  }
}
