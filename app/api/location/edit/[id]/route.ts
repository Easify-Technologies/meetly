import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

        const allowedFields = [
            "city",
            "country",
            "imageUrl",
        ];

        const dataToUpdate: any = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                dataToUpdate[field] = body[field];
            }
        }

        const linkedCafes = await prisma.cafe.findMany({
            where: { locationId: params.id },
            select: {
                name: true,
                id: true,
            }
        });

        const linkedCafesCount = await prisma.cafe.count({
            where: { locationId: params.id },
        });

        const updateLocation = await prisma.location.update({
            where: { id: params.id },
            data: dataToUpdate,
        });

        return NextResponse.json({
            message: "Location updated successfully",
            user: updateLocation,
            linkedCafesCount,
            linkedCafes,
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}