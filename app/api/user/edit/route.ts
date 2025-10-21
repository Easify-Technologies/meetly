import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
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

        // 🧠 NOTE: Email REMOVED from allowedFields
        const allowedFields = [
            "name",
            "phoneNumber",
            "gender",
            "dateOfBirth",
            "country",
            "city",
            "connectionStyles",
            "communicationStyles",
            "socialStyles",
            "healthAndFitness",
            "family",
            "spirituality",
            "politicalNews",
            "incorrectHumor",
            "kindOfPeople",
            "password",
        ];

        const dataToUpdate: any = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                dataToUpdate[field] = body[field];
            }
        }

        if (dataToUpdate.password) {
            const bcrypt = await import("bcrypt");
            dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: payload.userId },
            data: dataToUpdate,
        });

        return NextResponse.json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}
