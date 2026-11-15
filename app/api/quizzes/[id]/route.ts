import { prisma } from "@/lib/prisma";
import { res } from "../route";
import { createSession } from "@/app/test/cookies";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) 
{
    try {
        
        const {id}  = await params;
        if (!id)
            return res.json("unvalid Id retry later" , {status : 401});
        const questions = await prisma.quizzes.findMany({
            where : {
                id : id,
            },
            select : {
                QuizTitle: true, 
                questions_payload : true,
                right_answers : true
            },
            take : 1
        });
        return res.json(questions , {status : 200});
    } catch (error : any) {
        console.log(error)
        return res.json("server faced an error while getting the quiz " , {status : 500})
    }

}

export async function POST(req : Request)
{
    try {

        const UserId : any  =  await createSession();
        if (!UserId)
            return res.json("user not found" , {status : 404});
        const body = await req.json();
        const {quizID , userID, user_answer, score}  = body;
        const quiz = await prisma.quizzes.findMany({
            where : {
                id : quizID,
            }
        });
        if (!quiz)
            return res.json("Unvalid Quiz", {status : 401});

        const attmptQuiz = await prisma.quiz_attempts.create({
            data: {
                quiz_id : quizID,
                user_id : userID, 
                user_answers : user_answer, 
                score : score | 0,
            }
        });
        return res.json(`your score in this quiz is ${attmptQuiz?.score}` , {status : 201});
    } catch (error) {
        console.log(error);
        return res.json("faced an error please try again later" , {status : 501});
    }
}