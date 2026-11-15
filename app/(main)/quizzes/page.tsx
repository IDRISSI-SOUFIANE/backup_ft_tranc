import CreateQuiz from "./quizCreation";
import QuizQuestions from "./quizQuestions";

export default function Quizzes()
{
    return (
        <>
            <div className="">
                {/* <div className="w-screen  ml-3 pr-8">
                    <CreateQuiz />
                </div> */}
                <div className="">
                    <QuizQuestions/>

                </div>
            </div>
        </>
    )
}