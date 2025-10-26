'use server';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        
    } catch (error) {
        console.log(error);
    }
}