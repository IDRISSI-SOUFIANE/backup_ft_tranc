import { prisma } from "@/lib/prisma";
import { res } from "../quizzes/route";
import { createSession } from "@/app/test/cookies";

export async function GET() {
    try {
       
        const UserId : any  = await createSession();
        if (UserId == null)
            return res.json("Invalid User Id" , {status  : 404});
        console.log( "is this you",  UserId);
        const chats = await prisma.users.findMany({
            where : {
                id : {not :  UserId},
                OR : [
                    {
                        chat_messages_chat_messages_receiver_idTousers : {
                            some : {
                                sender_id : UserId
                            }
                        }
                    },
                    {
                        chat_messages_chat_messages_sender_idTousers :{
                            some : {
                                receiver_id : UserId
                            }
                        }
                    }
                ]
            },
            select : {
                id : true,
                first_name : true, 
                last_name : true,
                avatar_url : true
            },
            distinct : ['first_name']
        });
        return res.json(chats, {status : 200});
    } catch (error : any)  {
        console.log(error);
        return  res.json("facing error getting chats", {status : 500});
    }
    
}