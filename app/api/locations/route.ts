"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const city = formData.get("city") as string;
    const country = formData.get("country") as string;
    const file = formData.get("imageUrl") as File;

    if (!city || !country || !file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const fileName = `location_${timestamp}${extension}`;
    const assetsDir = path.join(process.cwd(), "public", "location");
    const filePath = path.join(assetsDir, fileName);

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const finalImage = `/location/${fileName}`;

    const location = await prisma.location.create({
      data: { city, country, imageUrl: finalImage },
    });

    return NextResponse.json(
      { message: "Location added successfully", location },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding location", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const locations = await prisma.location.findMany();
    return NextResponse.json({ locations }, { status: 200 })
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching locations", error: error.message }, { status: 500 });
  }
}