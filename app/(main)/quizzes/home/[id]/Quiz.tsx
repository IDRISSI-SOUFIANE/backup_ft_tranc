'use client'

import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Skeleton from "@/components/ui/Skeleton";
import { useSession } from "@/hooks/useSession";
import { count } from "console";
import { useState } from "react";
import useSWR from "swr"


interface params {
    id: string;
}



const fetcher = (url: string) => fetch(url).then(res => res.json());

function calculatingScore(Useranswers: any, Rightanswers: any): any {
    var counter: number = 0;
    var Wrongs: number[] = [];
    if (Useranswers.length == 0 || Rightanswers.length == 0)
        return counter;
    const keyuser: any = Object.keys(Useranswers);
    const keyright: any = Object.keys(Rightanswers);
    if (keyuser.length != keyright.length)
        return counter;
    console.log(keyuser, " ~~~ ", Useranswers);
    for (let i = 0; i < keyuser.length; i++) {
        if (Array.isArray(Useranswers[keyuser[i]]) && !Array.isArray(Rightanswers[keyuser[i]])) {
            Wrongs.push(i);
            continue;
        }
        else if ((Array.isArray(Useranswers[keyuser[i]]) && Array.isArray(Rightanswers[keyuser[i]])) && Useranswers[keyuser[i]].length != Rightanswers[keyuser[i]].length) {
            Wrongs.push(i);
            continue;
        }
        else if ((Array.isArray(Useranswers[keyuser[i]]) && Array.isArray(Rightanswers[keyuser[i]])) && Useranswers[keyuser[i]].length == Rightanswers[keyuser[i]].length) {
            let corr = true;
            for (let j = 0; j < Useranswers[keyuser[i]].length; j++) {
                if (Useranswers[keyuser[i]][j] != Rightanswers[keyuser[i]][j]) {
                    corr = false;
                    Wrongs.push(i);
                    break;
                }
            }
            if (corr == true)
                counter++;
        }
        else if (Useranswers[keyuser[i]] == Rightanswers[keyright[i]])
            counter++;
        else
            Wrongs.push(i);

    }
    return { counter, Wrongs };
}

interface QuizAttemppt {
    quizID: string,
    userID: string,
    user_answer: string,
    score?: number
}
export default function Quiz({ id }: params) {
    const { error, isLoading, data } = useSWR(`/api/quizzes/${id}`, fetcher);
    const [wrongQst, SetWrongQst] = useState<any[]>();
    const [resState, SetResState] = useState('');
    const [errorState, SetErrorState] = useState('');
    const [disableInput, SetdisableInput] = useState(false);
    const UserId : any  = useSession();

    console.log("we got no time ",id)
    if (isLoading)
        return <Skeleton />
    else if (error || !data)
        return <Alert children={error} variant="danger" />

    if (!Array.isArray(data))
        return  <Alert children={data || "error faced when getting the quiz"} variant="danger" />;
    // console.log("here we are ", JSON.parse(data[0].right_answers));
    const HandelQuiz = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const answers: any = {};

        for (let [key, value] of formData.entries()) {
            if (answers[key]) {

                if (Array.isArray(answers[key])) {
                    answers[key].push(value);
                } else {
                    answers[key] = [answers[key], value];
                }
            } else
                answers[key] = value;
        }
        // console.log("here awlidi ", answers);
        let mss = calculatingScore(answers, JSON.parse(data[0].right_answers));
        SetWrongQst(mss.Wrongs);
        try {
            const quizattemptEle: QuizAttemppt = {
                quizID: id,
                userID: UserId,
                user_answer: JSON.stringify(answers),
                score: mss.counter,
            };

            const response: any = await fetch(`/api/quizzes/${id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizattemptEle)
            });
            const data = await response?.json();

            if (response.ok) {
                SetResState(data);
                SetdisableInput(true);
            }
            else
                SetErrorState(data);

        } catch (error: any) {
            SetErrorState(error.message);

        }
    }
    return (
        <>
            {errorState != '' ? <Alert children={errorState} variant="danger" position='top-right' /> : ''}
            <div className="relative mb-5 w-full">
                <div className="absolute top-0 left-0">
                    <Button children={'<- Back'} onClick={()=>(window.history.back())}/>
                </div>
            </div>
            <div className=" text-primary text-2xl w-full">
                <form onSubmit={HandelQuiz} className="text-primary text-2xl w-full">
                    {
                        data.map((quiz: any, index: number) => {
                            const questionPayload = JSON.parse(quiz.questions_payload);
                            return (
                                <div className="p-6 space-y-8 justify-center items-center " key={index} >
                                    <p className="text-primary text-center font-bold">{quiz.QuizTitle}</p>
                                    {resState ? <p className="text-primary text-center font-bold">{resState + '/' + questionPayload.length}</p> : ''}
                                    {
                                        questionPayload.map((ele: any, questionIndex: number) => {
                                            const rdBorder = wrongQst?.includes(questionIndex);
                                            return (
                                                <div key={questionIndex} className={`bg-white p-6  ${rdBorder ? ' border-2 border-red-500' : 'border border-primary'} rounded-xl shadow-xl  w-full text-center`} >

                                                    <h3 className="text-xl font-bold mb-5 text-left text-gray-800">
                                                        {questionIndex + 1}. {ele.questionTitle}
                                                    </h3>

                                                    <div className="flex flex-col gap-3 w-full pl-2">
                                                        {ele.choices.map((choice: any) => (
                                                            <label
                                                                key={choice.id}
                                                                className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors w-full text-left border border-transparent hover:border-gray-200"
                                                            >
                                                                <input
                                                                    type={ele.type === 'checkbox' ? 'checkbox' : 'radio'}

                                                                    name={`question-${questionIndex}-${ele.questionTitle}`}
                                                                    value={choice.text}
                                                                    className="w-5 h-5  border-gray-300"
                                                                    disabled={disableInput}
                                                                />
                                                                <span className="text-lg text-gray-700 font-medium">
                                                                    {choice.text}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                    {resState == '' ? <Button type="submit">
                        send
                    </Button> : ''}
                </form>
            </div>


        </>
    )
}