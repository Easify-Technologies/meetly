import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextResponse) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "All fields are required", isLoggedIn: false },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid Credentials", isLoggedIn: false },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json(
            { message: "Invalid Credentials", isLoggedIn: false },
            { status: 400 }
        );

        await prisma.user.update({
            where: { id: user.id },
            data: { isLoggedIn: true },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email, isAdmin: user.isAdmin, },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            { message: user.isAdmin ? "Admin logged in" : "User logged in", userId: user.id, token, isLoggedIn: true, isAdmin: user.isAdmin, },
            { status: 201 }
        );

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message, isLoggedIn: true },
            { status: 500 }
        );
    }
}