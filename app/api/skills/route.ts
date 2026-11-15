import { prisma } from "@/lib/prisma";
import { res } from "../quizzes/route";
import { SkipBack } from "lucide-react";

export async function GET() 
{
    try {
        const skills = await prisma.skills.findMany();
        if (!skills)
            return res.json("uneable to fetch skills", {status : 200});
        return res.json(skills, {status : 200});
    } catch (error) {
        console.log(error);
        return res.json("error faced to return skills", {status : 500});
    }    
}