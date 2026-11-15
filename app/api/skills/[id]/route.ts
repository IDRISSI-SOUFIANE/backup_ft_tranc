import { NextRequest } from "next/server";
import { res } from "../../quizzes/route";
import { prisma } from "@/lib/prisma";

export async function GET(req : NextRequest, {params} : {params : Promise<{id : string}> }) {
    try {
        const {id} = await params;
        if (!id)
            return res.json("unvalid data user", {status : 403});
        const User = await prisma.users.findMany({
            where :{ id : id}
        });
        if (!User)
            return res.json("unvalid data user", {status : 403});
        
        const user_skill = await prisma.users.findMany({
            where : {
                id : id
            },
            include : { 
                user_skills : true
            }
        })

    } catch (error) {
        
    }
}