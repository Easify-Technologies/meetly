import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { addMinutes } from "date-fns";
import crypto from "crypto";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const findEmail = await prisma.user.findUnique({
      where: { email },
      select: { name: true },
    });

    if (!findEmail) {
      return NextResponse.json(
        { error: "Email address does not exist" },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = addMinutes(new Date(), 10);

    const link = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&email=${email}`;

    (await cookies()).set(
      "forgot_password_token",
      JSON.stringify({ email, token, expiresAt }),
      {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 60,
        sameSite: "strict",
        path: "/",
      }
    );

    const html = `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fafafa; border-radius: 8px; border: 1px solid #eee; max-width: 500px; margin: auto;">
        <h2 style="color: #6b4f4f;">🔒 Reset Your Password</h2>
        <p>Hey ${findEmail.name || "there"},</p>
        <p>We received a request to reset your password for <strong>Meetlyr</strong>.</p>
        <p>Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 24px 0;">
        <a href="${link}" style="display: inline-block; background-color: #6b4f4f; color: #fff; text-decoration: none; font-size: 18px; padding: 12px 24px; border-radius: 8px;">
            Reset Password
        </a>
        </div>
        <p>This link is valid for the next <strong>10 minutes</strong>. If you didn’t request a password reset, please ignore this email.</p>
        <p>— The Meetlyr Team ☕</p>
        </div>
    `;

    const verification = await transporter.sendMail({
      from: `"Meetlyr" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset Your Password ☕",
      html,
    });

    if (verification) {
      return NextResponse.json({ message: "Password reset link sent" });
    } else {
      return NextResponse.json(
        { error: "Email could not be sent" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
