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
                { error: "All fields are required", isLoggedIn: false },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid Credentials", isLoggedIn: false },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json(
            { error: "Invalid Credentials", isLoggedIn: false },
            { status: 400 }
        );

        await prisma.user.update({
            where: { id: user.id },
            data: { isLoggedIn: true },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            { message: user.isAdmin ? "Admin logged in" : "User logged in", userId: user.id, token, isLoggedIn: true, isAdmin: user.isAdmin, },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong", isLoggedIn: false },
            { status: 500 }
        );
    }
}