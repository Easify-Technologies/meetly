'use server';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const cafes = await prisma.cafe.findMany({
            where: {
                locationId: body.locationId
            },
            include: {
                location: {
                    select: {
                        name: true,
                        country: true,
                        imageUrl: true,
                    }
                }
            }
        });
        return NextResponse.json(cafes);

    } catch (error) {
        console.error("Error fetching cafes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
