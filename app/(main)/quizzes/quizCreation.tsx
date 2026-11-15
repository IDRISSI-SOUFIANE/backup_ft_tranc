import { useState } from "react";
import QuestionBuilder from "./QuizBuilder";
import Button from "@/components/ui/button";
import Alert from "@/components/ui/alert";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";
import QuizSectoin from "./QuizSection";

export interface Quiz {
    creator_id: string,
    questions_payload: string,
    right_answer :string,
    QuizTitle: string
}

export default function CreateQuiz({ numberQuestion, quizTitle }: { numberQuestion: number, quizTitle: string }) {
    const [Questions, SetQuestions] = useState<any[]>([]);
    const [resState, SetResState] = useState('');
    const [resError, SetResError] = useState('');
    const [loading, Setloading] = useState(false);
    const [disableButton, SetdisableButton] = useState(false);

    if (numberQuestion == 0 || !quizTitle || quizTitle.length == 0) {
        return (<>
            <img src="/no-quiz.jpeg" className="w-full max-w-5xl h-auto object-contain mx-auto" alt="no-quiz" /> 
        </>)
    }
    const HandelQuestionChange = (id: number, qstData: any) => {
        SetQuestions((prev: any[]) => {
            const newqst = [...prev];
            newqst[id] = qstData;
            return newqst;
        })
    }



    const Handelclick = async () => {
        try {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            // SetdisableButton(true);
            // Setloading(true);
            // const element_Quiz: Quiz = {
            //     creator_id: UserId,
            //     questions_payload: JSON.stringify(Questions),
            //     QuizTitle: quizTitle
            // };

            
            // const response: any = await fetch('/api/quizzes', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(element_Quiz)
            // })
            // .catch(err => { SetResError(err) , console.log(err) });
            // const data  = await response?.json();

            // if (response?.ok)
            //     SetResState(data);
            // else
            // {
            //     SetResError(data);
            // }
            // Setloading(false);
            
            SetdisableButton(true);


        } catch (error: any) {
            console.log(error);
            SetResError(error.message);
        }

    }
    var display: boolean = true;
    { (loading == true || disableButton == true ) ||  (resError == '' && resError == undefined) ? display = false : display = true }
    
    return (
        <>


            <div className={`text-center mb-10 `}>
                <span className="text-5xl font-bold text-primary ">
                    {quizTitle}
                </span>
            </div>
            <div>
                {loading == true ?
                    <Spinner  color='primary'/>
                    : ''}
            </div>
            {display ?
                (<div >

                    {Array.from({ length: numberQuestion }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2 text-center mt-5">
                            <h2 className="text-lg font-bold text-gray-700 ml-2">
                                Question {index + 1}
                            </h2>
                            <QuestionBuilder
                                id={index}
                                onChange={(data) => HandelQuestionChange(index, data)}
                            />
                        </div>
                    ))}



                    <div className={`flex justify-end mt-5 w-full ${display}`}>
                        <Button onClick={Handelclick} disabled={disableButton}> Save </Button>
                    </div>
                </div>

                ) : <QuizSectoin questions_payload={Questions} QuizTitle={quizTitle} />
            }
        </>
    )
}