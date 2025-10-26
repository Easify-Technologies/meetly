import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { payload, userId } = body;

    // Combine first_name + last_name → name (if present)
    let dataToUpdate: any = { ...payload };
    if (payload.first_name || payload.last_name) {
      const fullName = `${payload.first_name ?? ""} ${payload.last_name ?? ""}`.trim();
      dataToUpdate.name = fullName;
      delete dataToUpdate.first_name;
      delete dataToUpdate.last_name;
    }

    // ✅ Rename fields to match Prisma model
    if (payload.phone_number) {
      dataToUpdate.phoneNumber = payload.phone_number;
      delete dataToUpdate.phone_number;
    }
    if (payload.date_of_birth) {
      dataToUpdate.dateOfBirth = payload.date_of_birth;
      delete dataToUpdate.date_of_birth;
    }

    // Filter empty fields (partial update)
    const filteredData = Object.fromEntries(
      Object.entries(dataToUpdate).filter(([_, v]) => v !== "" && v !== undefined)
    );

    const updatedUser = await prisma.user.update({
      where: { email: userId},
      data: filteredData,
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("User update error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
