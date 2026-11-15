import { prisma } from "@/lib/prisma";

export   async function CreateMsg(sender_id: string , reciver_id: string , content: string) {
    if (!sender_id || !reciver_id || !content)
    {
    //     console.log(sender_id , "  righ " , reciver_id ,  "  " , content);
        console.log("all element should be valid");
        throw "all element should be valid"

    }
    
    return await prisma.chat_messages.create({
        data :{
            sender_id : sender_id,
            receiver_id  : reciver_id,
            message_text : content
        }
    });
}

export async function UpdateRead(sender_id: string , reciver_id: string) {
    
    if (!sender_id || !reciver_id)
    {
    //     console.log(sender_id , "  righ " , reciver_id ,  "  " , content);
        console.log("all element should be valid");
        throw "all element should be valid";

    }
    console.log("here");
    await prisma.chat_messages.updateMany({
        where : {
            sender_id : {equals : sender_id}, 
            receiver_id : {equals : reciver_id},
            is_read : {equals : false}
        },
        data : {
            is_read : true
        }
    }) 
} 
