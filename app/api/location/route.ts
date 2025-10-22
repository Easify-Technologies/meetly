import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
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
        const body = await request.json();
        const { city, country, imageUrl } = body;

        if (!city || !country || !imageUrl) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const location = await prisma.location.create({
            data: {
                city,
                country,
                imageUrl
            }
        });

        return NextResponse.json(
            { message: "Location added successfully", location },
            { status: 201 }
        );

    } catch (error:any) {
        console.error(error);
        return NextResponse.json(
            { message: "Error adding location", error: error.message },
            { status: 500 }
        );
    }
}