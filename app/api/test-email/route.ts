// app/api/test-email/route.ts
import { sendMeetupEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await sendMeetupEmail({
      to: ["mdsaifseacom@gmail.com"],
      groupNames: "Test User",
      cafe: { name: "Test Café", address: "Test Street 123" },
      date: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
