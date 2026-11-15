'use client'

import Alert from "@/components/ui/alert";
import GetContacts, { fetcher } from "./GetContacts";
import useSWR from "swr";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserId } from "@/app/page";


export default function ChatList() {
    const { data, isLoading, error } = useSWR('/api/chat', fetcher);
    const pathid = usePathname();
    
if (error)
        return <Alert children={error || "error faced to resolve the request"}  variant="danger" />;
    if (isLoading)
        return <Skeleton />;

    // data.sort((a , b) => )
    // console.log("here izenzaren :" , data);
    return (
        <>

            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Chats
                </div>
                <ul className="space-y-1 px-2">
                    {data.length > 0 ? 
                        data?.map((chat: any, index: number) => {
                            const isActive = pathid.split("/")[2] == chat.id;
                            return (
                            <Link href={`/chat/${chat.id}`} key={index}>
                                <li  key={index} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50'}`}>
                                    <div className="relative">
                                        <img src={'/default_profile.png'} alt={chat.first_name} className="w-10 h-10 rounded-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                                                {chat.first_name}
                                            </p>
                                            {/* {chat.time && (
                                                <span className={`text-xs whitespace-nowrap ml-2 ${chat.isActive ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                    {chat.time}
                                                </span>
                                            )} */}
                                        </div>
                                            {/* <p className={`text-xs truncate mt-0.5 ${chat.isActive ? 'text-indigo-100' : 'text-gray-500'}`}>
                                                {chat.lastMessage}
                                            </p> */}
                                    </div>
                                </li>
                            
                            </Link>
                        )
                    }) : ''
                    }
                </ul>

                <div className="px-4 py-3 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Contacts
                </div>

                <ul className="space-y-1 px-2 pb-4">
                    <GetContacts  chats={data}/>
                </ul>

            </div>

        </>
    )
}