<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // --- JWT VALIDATION ---
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let payload: any;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // --- ADMIN VALIDATION ---
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId },
    });
    if (!admin) {
      return NextResponse.json({ message: "Only admins can create events" }, { status: 403 });
    }

    // --- BODY VALIDATION ---
    const body = await request.json();
    const { date, city, country, cafeId } = body;

    if (!date || !city || !country) {
      return NextResponse.json(
        { message: "Date, city, and country are required" },
        { status: 400 }
      );
    }

    // --- CREATE EVENT ---
    const event = await prisma.event.create({
      data: {
        date: new Date(date),
        city,
        country,
        cafeId: cafeId || null,
        createdBy: admin.id,
      },
      include: {
        cafe: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Error creating event", error: error.message },
      { status: 500 }
    );
  }
}
=======
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // --- JWT VALIDATION ---
    // const authHeader = request.headers.get("Authorization");
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return NextResponse.json({ message: "No token provided" }, { status: 401 });
    // }

    // const token = authHeader.split(" ")[1];
    // let payload: any;

    // try {
    //   payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    // } catch (error) {
    //   return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    // }

    // // --- ADMIN VALIDATION ---
    // const admin = await prisma.admin.findUnique({
    //   where: { id: payload.adminId },
    // });
    // if (!admin) {
    //   return NextResponse.json({ message: "Only admins can create events" }, { status: 403 });
    // }

    // --- BODY VALIDATION ---
    const body = await request.json();
    const { date, city, country, cafeId } = body;

    if (!date || !city || !country) {
      return NextResponse.json(
        { error: "Date, city, and country are required" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const now = new Date();

    selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    // --- CREATE EVENT ---
    const event = await prisma.event.create({
      data: {
        date: selectedDate,
        city,
        country,
        cafeId: cafeId || null,
        createdBy: "68fe04fc214c35383d3a8ebd",
      },
      include: {
        cafe: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Error creating event", error: error.message },
      { status: 500 }
    );
  }
}

