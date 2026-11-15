import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const allUsers = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        avatar_url: true,
        institution_or_job: true,
        bio: true,
        location: true,
      },
    });

    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}