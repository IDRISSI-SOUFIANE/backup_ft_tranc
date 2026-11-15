import { useRef, useState } from "react";
import { Quiz } from "./quizCreation";
import Button from "@/components/ui/button";
import html2PDF from 'jspdf-html2canvas';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert";
import { useSession } from "@/hooks/useSession";

export default function QuizSectoin({ questions_payload, QuizTitle }: any) {
    const divRef = useRef<any>(null);
    const [resState, SetResState] = useState('');
    const [resError, SetResError] = useState('');
    const router = useRouter();
    const UserId : any  = useSession();


    const HandelPdf = (e: any) => {
        e.preventDefault();
        const pdfInput = divRef.current;
        html2PDF(pdfInput, { jsPDF: { format: "a4" }, imageType: 'image/jpeg', output: './generate.pdf' })
    }

    const HandelShare = async (e: any) => {
        // console.log("here we are");
        e.preventDefault();
        const formData = new FormData(e.target);
        const answers: any = {};
        for (let [key, value] of formData.entries()) {
            if (answers[key]) {
                if (Array.isArray(answers[key]))
                    answers[key].push(value);
                else
                    answers[key] = [answers[key], value];
            }
            else
                answers[key] = value;

        }

        try {

            const element_Quiz: Quiz = {
                creator_id: UserId,
                questions_payload: JSON.stringify(questions_payload),
                right_answer : JSON.stringify(answers),
                QuizTitle: QuizTitle
            };

            // console.log(element_Quiz);
            const response: any = await fetch('/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(element_Quiz)
            })
                .catch(err => { SetResError(err), console.log(err) });
            const data = await response?.json();

            if (response?.ok)
                SetResState(data);
            else {
                SetResError(data);
            }

            router.push('/quizzes/home');


        } catch (error: any) {
            console.log(error);
            SetResError(error.message);
        }

    }

    return (
        <>
            {resState != '' && resState != undefined ? <Alert children={resState} position="bottom-right" /> : ''}
            {resError != '' && resError != undefined ? <Alert children={resError} variant={'danger'} position="bottom-right" /> : ''}
            <div className="text-black  text-center w-full " >
                <h2 className="text-primary">Selet the correct answer </h2>
                <form onSubmit={HandelShare}>
                    <div className="p-6 space-y-8" ref={divRef} >

                        {
                            questions_payload.map((ele: any, questionIndex: number) => {
                                return (
                                    <div key={questionIndex} className="flex flex-col items-start bg-white p-6 rounded-xl shadow-xl border border-gray-100 ">

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
                                                    />
                                                    <span className="text-lg text-gray-700 font-medium">
                                                        {choice.text}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                <div className="flex space-x-1">
                    <Button className="w-24" type="submit"> Share </Button>
                    <Button onClick={HandelPdf} className="w-24">Download</Button>

                </div>
                </form>
            </div>
        </>

    )
}