import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await prisma.user.update({
      where: { email: body.email },
      data: { isLoggedIn: false },
    });

    return NextResponse.json(
      { message: "User logged out", isLoggedIn: false },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
