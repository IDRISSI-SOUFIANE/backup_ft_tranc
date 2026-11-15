'use client'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import react, { useActionState, useRef } from "react";
import { useState } from "react";
import CreateQuiz from "./quizCreation";


function checkHas(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '.')
            return true;
    }
    return false;
}
export default function QuizQuestions() {
    const [NumberQst, SetNumberQst] = useState(0);
    const [ErrorMsgNB, SetErrorMsgNB] = useState('');
    const [ErrorMsgTL, SetErrorMsgTL] = useState('');
    const [Title, SetTitle] = useState('')
    const [clicked , SetClicked] = useState(false);


    const HandelNumberQst = (e: any) => {

        const NumbervalueStr: string = e.target.value;
        if (checkHas(NumbervalueStr) === true) {
            SetErrorMsgNB("the number should be a digit");
            return;
        }
        const NumbervalueNbr: number = Number(NumbervalueStr);

        SetNumberQst(NumbervalueNbr);
        if ((NumbervalueNbr < 5 || NumbervalueNbr > 20)) {
            SetErrorMsgNB("the number should be bigger than 5 and less than 20");
        }
        else {
            SetErrorMsgNB("");
        }

    }
    const handelTitleQst = (e: any) => {
        const titleVal = e.target.value;
        if (titleVal.length > 200) {
            SetErrorMsgTL('length of the title should be less than 200');
            return;
        }
        else
            SetErrorMsgTL('');
        SetTitle(titleVal);
    }
    const handelSubmit = (e: any) => {
        if (ErrorMsgNB.length > 0 || ErrorMsgTL.length > 0 || NumberQst == 0 || Title.length == 0)
            SetClicked(false);
        else
            SetClicked(true);

    }
    return (

        <>
            <div className="flex min-h-screen min-w-75 justify-stretch">
                <div className="flex-1 flex flex-col ml-3 pr-8">
                    {clicked ? <CreateQuiz numberQuestion={NumberQst} quizTitle={Title}/> : <CreateQuiz numberQuestion={0} quizTitle={''}/>}
                </div>
                <div className="inline-block p-4 rounded-xl shadow-xl shadow-black/30 bg-gray-100  w-160 h-110">
                    <div className="text-center text-primary font-bold text-2xl">
                        <span>Create your quiz</span>
                    </div>
                    <div className="mt-5 text-center font-semibold text-xl">
                        <span>enter the number of questions</span>
                        <Input type="number"  className="field-sizing-fixed" disabled={clicked} placeholder="enter number of questions between 5 and 20" onChange={HandelNumberQst} error={ErrorMsgNB} />
                    </div>
                    <div className="mt-5 text-center font-semibold text-xl">
                        <span>enter the title of the quiz</span>
                        <Input type="text" className="field-sizing-fixed" value={Title} disabled={clicked} placeholder="enter title of the question" maxLength={200} onChange={handelTitleQst} error={ErrorMsgTL} />
                    </div>
                    <div className="mt-5 text-center font-semibold text-xl">
                        <Button children="Create Quiz" className="font-semibold text-lg" disabled={ErrorMsgNB.length > 0 || ErrorMsgTL.length > 0 || NumberQst == 0 || Title.length == 0 || clicked== true ? true : false} onClick={handelSubmit} />
                    </div>

                </div>
            
            </div>
        </>
    )


}