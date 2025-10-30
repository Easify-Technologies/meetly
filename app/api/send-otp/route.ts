import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { addMinutes } from "date-fns";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

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

    const otp = generateOTP();
    const expiresAt = addMinutes(new Date(), 10);

    (await cookies()).set(
      "email_otp",
      JSON.stringify({ email, otp, expiresAt }),
      {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 60,
        sameSite: "strict",
        path: "/",
      }
    );

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fafafa; border-radius: 8px; border: 1px solid #eee; max-width: 500px; margin: auto;">
        <h2 style="color: #6b4f4f;">🔐 Verify Your Email Address</h2>
        <p>Hey ${findEmail.name || "there"},</p>
        <p>Thank you for signing up with <strong>Meetlyr</strong>!</p>
        <p>To complete your verification, please use the One-Time Password (OTP) below:</p>

        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; background-color: #6b4f4f; color: #fff; font-size: 24px; letter-spacing: 6px; padding: 12px 24px; border-radius: 8px;">
            ${otp}
          </span>
        </div>

        <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you didn’t request this verification, you can safely ignore this email.</p>
        <p>— The Meetlyr Team ☕</p>
      </div>
    `;

    const verification = await transporter.sendMail({
      from: `"Meetlyr" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Email Verification ☕",
      html,
    });

    if (verification) {
      return NextResponse.json({ message: "OTP sent successfully" });
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
