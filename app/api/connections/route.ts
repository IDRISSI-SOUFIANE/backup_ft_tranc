import { createSession } from "@/app/test/cookies";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
      const UserId : any  = await createSession();
      const CURRENT_USER_ID =  UserId;
      if (CURRENT_USER_ID == null)
          return NextResponse.json("Invalid User Id " , {status : 404});

    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { senderId: CURRENT_USER_ID },
          { receiverId: CURRENT_USER_ID },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return NextResponse.json(connections, { status: 200 });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json(
      { error: "Failed to fetch connections" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {

  const UserId : any  = await createSession();
    const CURRENT_USER_ID =  UserId;
    if (CURRENT_USER_ID == null)
        return NextResponse.json("Invalid User Id " , {status : 404});

    const { receiverId } = await req.json();

    if (!receiverId) {
      return NextResponse.json(
        { error: "Receiver ID is required" },
        { status: 400 }
      );
    }

    // 1. Search for any existing connection record between these two users
    const existingConn = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId: CURRENT_USER_ID, receiverId: receiverId },
          { senderId: receiverId, receiverId: CURRENT_USER_ID },
        ],
      },
    });

    // 2. If a record already exists (e.g. status was REJECTED), UPDATE it to PENDING
    if (existingConn) {
      const updatedConn = await prisma.connection.update({
        where: { id: existingConn.id },
        data: {
          senderId: CURRENT_USER_ID,
          receiverId: receiverId,
          status: "PENDING",
        },
        include: { sender: true, receiver: true },
      });

      return NextResponse.json(updatedConn, { status: 200 });
    }

    // 3. If no record exists at all, CREATE a new connection row
    const newConnection = await prisma.connection.create({
      data: {
        senderId: CURRENT_USER_ID,
        receiverId: receiverId,
        status: "PENDING",
      },
      include: { sender: true, receiver: true },
    });

    return NextResponse.json(newConnection, { status: 201 });
  } catch (error) {
    console.error("Error sending connection request:", error);
    return NextResponse.json(
      { error: "Failed to send connection request" },
      { status: 500 }
    );
  }
}