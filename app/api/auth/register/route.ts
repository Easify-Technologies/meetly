import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      cafe_id,
      city_id,
      connectionStyle,
      communicationStyle,
      socialStyle,
      healthFitnessStyle,
      family,
      spirituality,
      politicsNews,
      humor,
      peopleType,
      password,
    } = body;

    // Validation: ensure no empty field
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !gender ||
      !dateOfBirth ||
      !cafe_id ||
      !city_id ||
      !connectionStyle ||
      !communicationStyle ||
      !socialStyle ||
      !healthFitnessStyle ||
      !family ||
      !spirituality ||
      !politicsNews ||
      !humor ||
      !peopleType ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required", isLoggedIn: false },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const getCity = await prisma.location.findUnique({
        where: {
            id: city_id
        },
        select: {
            city: true,
            country: true
        }
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        country: getCity?.country || "",
        city: getCity?.city || "",
        connectionStyles: connectionStyle,
        communicationStyles: communicationStyle,
        socialStyles: socialStyle,
        healthAndFitness: healthFitnessStyle,
        family: family.toString(),
        spirituality: spirituality.toString(),
        politicalNews: politicsNews.toString(),
        incorrectHumor: humor.toString(),
        kindOfPeople: peopleType,
        password: hashedPassword,
        isLoggedIn: true
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: user.id,
        token,
        isLoggedIn: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Something went wrong", isLoggedIn: false },
      { status: 500 }
    );
  }
}