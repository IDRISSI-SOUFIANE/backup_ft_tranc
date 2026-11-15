
import { prisma } from "@/lib/prisma";
import { res } from "../../quizzes/route";
import { NextRequest } from "next/server";
import { UserId } from "@/app/page";
import { createSession } from "@/app/test/cookies";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const UserId : any  =  await createSession();
        
        if (UserId == null)
            return res.json("Invalid User Id" , {status  : 401});
        const user_id = UserId;
        const { id } = await params;
        const reciver = await prisma.users.findMany({where : {id : id} , select : {first_name : true , last_name : true , avatar_url : true}});
        if (!reciver)
            return res.json({ error: "unauthorized" }, { status: 401 });
        const messages = await prisma.chat_messages.findMany({
            where: {
                OR: [
                    
                    { sender_id: user_id, receiver_id: id },
                    { sender_id: id, receiver_id: user_id }
                ]
            },
            orderBy: {
                created_at: 'asc', 
            },
            include: {
                // users_chat_messages_sender_idTousers
                users_chat_messages_sender_idTousers : 
                {
                    select : {
                        first_name : true, 
                        avatar_url : true, 
                        last_name : true
                    }
                }
                
            }
        });
        const stringIdMessages = messages.map(msg=> ({
                ...msg, 
                id : msg.id.toString()
            })
        );
        return res.json({stringIdMessages , reciver}, { status: 200 });
    } catch (error) {
        console.log("here is the error we get", error);
        return res.json('error faced with session', { status: 501 });
    }
}