import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CURRENT_USER_ID = "u00";

export async function GET() {
  try {
    const notification = await prisma.notification.findMany({
      where: {
        userId: CURRENT_USER_ID,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.log("Error fetching notification", error);

    return NextResponse.json(
      { error: "failed to fetch notification" },
      { status: 500 },
    );
  }
}
