'use client'


import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Skeleton from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json());


export default function Home() {
    const { error, isLoading, data } = useSWR('/api/quizzes', fetcher);
    const route = useRouter();
    if (isLoading)
        return <Skeleton/>
    else if (error || !Array.isArray(data))
        return <Alert children={error || data} variant="danger" />

    if(data.length == 0)
    {
        return (
            <>
                <div className="flex items-center justify-center h-full">
                    <img src={"/no-friend-quiz.jpeg"} className="object-contain h-full mx-auto p-10" alt="no quiz yet"/>
                </div>
            </>
        )
    }
    var randQuiz = data?.flatMap((qz: any) =>
        qz.quizzes.map((quiz: any) => ({
            ...quiz,
            creator: qz.first_name
        }))
    )

    randQuiz = randQuiz.sort(() => Math.random() - 0.5);
    
    // console.log("data ->", data);
    // console.log("khaliik maaya ->", randQuiz);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {randQuiz.map((quiz: any, ele : number) => {
                
                return (
                    <div key={ele} className="rounded-xl border border-indigo-500 bg-white p-5 shadow-sm">
                        
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                                {quiz.creator[0]}
                            </div>
                            <p className="font-bold text-gray-800">{quiz.creator}</p>

                        </div>
                        <h2 className="my-2 text-xl font-bold text-indigo-600">{quiz.QuizTitle}</h2>

                        <Button onClick={() => route.push(`/quizzes/home/${quiz.id}`)} className="!w-24 inline-flex items-center text-white bg-primary" >
                            Try it →
                        </Button>
                    </div>
            )})}
        </div>


    );


}