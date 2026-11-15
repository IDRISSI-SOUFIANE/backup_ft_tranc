'use client'

import useSWR from "swr";
import Alert from "@/components/ui/alert";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";


export const fetcher = (url: string) => (fetch(url).then(res => res.json()));

export default function GetContacts({chats} : any) {
    const { error, isLoading, data } = useSWR('/api/connections', fetcher);
    const UserId = useSession();

    if (error || !data || !Array.isArray(data))
        return <Alert children={error || "error faced to resolve the quiz"} variant="danger" />;
    if (isLoading)
        return <Skeleton />


    const contacts = data.filter((cn : any) => {
        const conn = UserId == 	cn.senderId ? cn.receiver  : cn.sender;
        // console.log(conn);
        return !chats?.some((ele: any) => ele.id == conn.id);
    });
    // console.log("the sopranos : "  , contacts);
    return (
        <>
            
                {
                    contacts?.map((contact: any, index: number) => {
                        const conn = UserId == 	contact.senderId ? contact.receiver  : contact.sender;
                        const avatar =  'https://i.pravatar.cc/150?u=felecia';
                        return (
                            <Link href={`/chat/${conn.id}`} key={index}>
                                <li key={index} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <img src={avatar} alt={conn.first_name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{conn.first_name}</p>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{conn.last_name}</p>
                                    </div>
                                </li>
                            </Link>
                        )
                    }
                    )
                }
        </>
    )
}