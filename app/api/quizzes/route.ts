import { createSession } from "@/app/test/cookies";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const  res = NextResponse;



export async function GET() {
    try {
        const UserId : any  =  await createSession();
        
        if (UserId == null)
            return res.json("Invalid User Id" , {status  : 401});
        const user = UserId;
        if (!user)
            return res.json("User not found", { status: 404 });
        const quizzes = await prisma.users.findMany({
            where: {

            id: { not: user },
            OR: [
                {
                    
                    Connection_Connection_senderIdTousers: {
                        some: {
                            receiverId: user,
                            status: 'ACCEPTED'
                        }
                    }
                },
                {
                    Connection_Connection_receiverIdTousers: {
                        some: {
                            senderId: user,
                            status: 'ACCEPTED'
                        }
                    }
                }
            ],
            quizzes: {
                some: {}
            }
            },
            select: {
                id: true,
                first_name: true,
                quizzes: {
                    select: {
                        id: true,
                        QuizTitle: true
                    }
                }
            }
        });
        const rndQuiz = quizzes.sort(() => 0.5 - Math.random());
        return res.json(rndQuiz, { status: 200 });
    } catch (error) {
        console.log(error);
        return res.json("error faced ", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {


        const body = await req.json();
        if (!body)
            return res.json("please try again later , a problem is  faced", { status: 401 });

        const { creator_id, questions_payload, right_answer,  QuizTitle } = body;
        const User = await prisma.users.findUnique({ where: { id: creator_id } });
        if (!User)
            return res.json("User not found", { status: 404 });
        if (!creator_id || !questions_payload || !QuizTitle)
            return res.json("invalid arguments", { status: 401 });
        await prisma.quizzes.create({
            data: {
                creator_id: creator_id,
                questions_payload: questions_payload,
                right_answers : right_answer, 
                QuizTitle: QuizTitle
            }
        })
        return res.json("Quiz created successfully ", { status: 201 });
    } catch (error: any) {
        console.log(error);
        if (error.code == 'p2005')
            return res.json("Invalid data format", { status: 501 });
        else if (error.code == 'P2039')
            return res.json("connection is not established", { status: 501 });


        return res.json("an error occured, please try again", { status: 501 });
    }
}