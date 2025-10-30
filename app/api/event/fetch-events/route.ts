'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                date: true,
                city: true,
                country: true,
                cafe: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
                isClosed: true,
                admin: {
                    select: {
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(events);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}