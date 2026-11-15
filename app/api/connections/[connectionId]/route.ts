import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Connection_status } from "@/generated/prisma/enums";

export async function PATCH( req: NextRequest, { params }: { params: Promise<{ connectionId: string }> } /* Match folder name [connectionId]*/) {
	
	// console.log("req.json: ",req.json, "soufiane-params: ", params);
	try {
	const { action } = await req.json();
	const { connectionId } = await params; // Destructure connectionId

	// console.log("connectionId:", connectionId, "action: ", action);

	const existingConn = await prisma.connection.findUnique({
		where: { id: connectionId },
	});

	// console.log("existingConn: ", existingConn);

	if (!existingConn) {
		return NextResponse.json(
			{ error: "Connection not found" },
			{ status: 404 }
		);
	}

	const normalizedAction = action?.toUpperCase();

	if (normalizedAction === "ACCEPT" )  // || normalizedAction === "ACCEPTED"
		{
			const [updateConn] = await prisma.$transaction([
				prisma.connection.update({
					where: { id: connectionId },
					data: { status: "ACCEPTED" },
					include: { sender: true, receiver: true },
				}),
				prisma.notification.create({
					data: {
						userId: existingConn.senderId,
						type: "CONNECTION_ACCEPTED",
						message: "accepted your connection request.",
					},
				}),
			]);

			return NextResponse.json(updateConn, { status: 200 });
		}
	return NextResponse.json({ error: "Invalid action" }, { status: 400 });
	} catch (error) {
		console.error("Error updating connection:", error);
		return NextResponse.json(
			{ error: "Failed to update connection" },
			{ status: 500 }
		);
	}

}

export async function DELETE( req: Request, { params }: { params: Promise<{ connectionId: string }> } // Match folder name [connectionId]
) {
	try {
		const { connectionId } = await params; // Destructure connectionId

		await prisma.connection.update({
			where: {id: connectionId},
			data: {
				status: "REJECTED"
			},
		});

		return NextResponse.json({ message: "Connection moved back to pending successfully"}, {status: 200});
	} catch (error) {
		console.error("Error update connection status:", error);
		return NextResponse.json(
			{ error: "Failed to update connection status" },
			{ status: 500 }
		);
	}
}

