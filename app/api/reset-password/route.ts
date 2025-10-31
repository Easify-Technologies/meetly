"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, confirm_password } = body;

    if (!password || !confirm_password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirm_password) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.get("forgot_password_token");

    if (!cookie) {
      return NextResponse.json(
        { error: "Forgot Password token is missing" },
        { status: 400 }
      );
    }

    const { email: storedEmail, expiresAt } = JSON.parse(cookie.value);

    if (new Date(expiresAt) < new Date()) {
      cookieStore.delete("forgot_password_token");
      return NextResponse.json(
        { error: "Reset link expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: storedEmail },
      data: { password: hashedPassword },
    });

    cookieStore.delete("forgot_password_token");

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
