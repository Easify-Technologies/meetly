import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            country,
            city,
            connectionStyles,
            communicationStyles,
            socialStyles,
            healthAndFitness,
            family,
            spirituality,
            politicalNews,
            incorrectHumor,
            kindOfPeople,
            password,
        } = body;

        if (
            !name ||
            !email ||
            !phoneNumber ||
            !gender ||
            !dateOfBirth ||
            !country ||
            !city ||
            !connectionStyles ||
            !communicationStyles ||
            !socialStyles ||
            !healthAndFitness ||
            !family ||
            !spirituality ||
            !politicalNews ||
            !incorrectHumor ||
            !kindOfPeople ||
            !password
        ) {
            return NextResponse.json(
                { message: "All fields are required", isLoggedIn: false },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 },);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phoneNumber,
                gender,
                dateOfBirth,
                country,
                city,
                connectionStyles,
                communicationStyles,
                socialStyles,
                healthAndFitness,
                family,
                spirituality,
                politicalNews,
                incorrectHumor,
                kindOfPeople,
                password: hashedPassword,
            },
        });

        await prisma.user.update({
            where: { id: user.id },
            data: { isLoggedIn: true },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        return NextResponse.json(
            { message: "User created", userId: user.id, token, isLoggedIn: true },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message, isLoggedIn: false },
            { status: 500 }
        );
    }
}