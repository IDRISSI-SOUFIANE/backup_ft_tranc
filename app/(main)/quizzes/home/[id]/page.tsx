
import Alert from "@/components/ui/alert";
import Skeleton from "@/components/ui/Skeleton";
import useSWR from "swr"
import Quiz from "./Quiz";



export default async function HomeQuiz({params}: {params: Promise<{ id: string }>;})
{
    const {id} = await params;
    return (
        <Quiz id={id} />
    )

}