"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp } = body;

    if (!otp) {
      return NextResponse.json({ error: "OTP is required" }, { status: 400 });
    }

    const cookie = (await cookies()).get("email_otp");
    if (!cookie) {
      return NextResponse.json(
        { error: "OTP expired or missing" },
        { status: 400 }
      );
    }

    const {
      email: storedEmail,
      otp: storedOtp,
      expiresAt,
    } = JSON.parse(cookie.value);

    if (new Date(expiresAt) < new Date()) {
      (await cookies()).delete("email_otp");
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    (await cookies()).delete("email_otp");
    await prisma.user.update({
      where: { email: storedEmail },
      data: { isVerified: true },
    });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
