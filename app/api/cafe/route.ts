import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const locationId = formData.get("locationId") as string;
    const file = formData.get("imageUrl") as File;

    if (!name || !address || !locationId || !file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const fileName = `cafe_${timestamp}${extension}`;
    const assetsDir = path.join(process.cwd(), "public", "cafe");
    const filePath = path.join(assetsDir, fileName);

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const finalImage = `/cafe/${fileName}`;

    const saveCafe = await prisma.cafe.create({
      data: {
        name,
        address,
        locationId,
        imageUrl: finalImage,
      },
    });

    return NextResponse.json(
      { message: "Cafe added successfully", cafe: saveCafe },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding cafe", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cafes = await prisma.cafe.findMany({
      include: {
        location: {
          select: {
            city: true
          }
        }
      }
    });
    return NextResponse.json(cafes, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching cafes", error: error.message },
      { status: 500 }
    );
  }
}
