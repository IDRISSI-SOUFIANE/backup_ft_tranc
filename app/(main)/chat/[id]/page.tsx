'use client'
import Alert from '@/components/ui/alert';
import Skeleton from '@/components/ui/Skeleton';
import {
    Search, Bell, Moon, Languages,
    Phone, Video, MoreVertical,
    Paperclip, Mic, Send,
    Key
} from 'lucide-react';
import { usePathname } from "next/navigation";
import useSWR from 'swr';
import { fetcher } from '../GetContacts';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/ui/input';
import { createSession } from '@/app/test/cookies';
import { useSession } from '@/hooks/useSession';


export default function Chat() {
    const pathid = usePathname();
    const { data , isLoading, error }  = useSWR(`/api/chat/${pathid.split("/")[2]}`, fetcher);
    const divRef = useRef<any>(null);
    const msgRef = useRef<any>(null);
    const wssRef = useRef<WebSocket | null>(null);
    const [MessagesState, SetMessagesState] = useState<any[]>([]);
    const UserId = useSession();

    useEffect(() => {
        divRef.current?.scrollIntoView({ behaivor: "smooth" });
    }, [MessagesState])

    useEffect(() => {
        if (data)
            SetMessagesState(data.stringIdMessages);
    }, [data]);

    useEffect (()=> {
        if (!UserId)
            return ; 
        const wss = new WebSocket(`ws://${window.location.host}/ws`);
        wssRef.current = wss;
        wss.onopen = ()=>{
            // console.log("so i had little " , UserId);
            wss.send(JSON.stringify({type: "register" , sessionId : UserId}));
            wss.send(JSON.stringify({type : 'update to read' , payload :{send_id : pathid.split("/")[2], reciver_id :UserId  }}))
            console.log("socket opned succefully");
        }
        wss.onmessage = (e)=>{
            const NewMsg = JSON.parse(e.data);
            if (NewMsg.type == "read Msg")
            {
                SetMessagesState(prev => prev.map(msg => 
                            msg.sender_id === pathid.split("/")[2] 
                                ? { ...msg, is_read: true } 
                                : msg
                ));
            }
            else{
                SetMessagesState((prev) => [...prev, NewMsg]);

            
            }
        }
        wss.onerror = (err : any) =>{
            return <Alert children={err} position='top-right'/>
        }
    }, [UserId]);


   



    if (error  || data?.length <=0)
            return <Alert children={error || "error faced to resolve the quiz"} />;
    if (isLoading ) 
        return <Skeleton />
    


    const Handelsendmsg = (e : any) => {
        e.preventDefault();
        const msg = msgRef.current.value;
        if (!msg || msg == '')
            return ;
        if (!wssRef || !wssRef.current)
            return ;

        const datemsg =  new Date().toLocaleString("sv-SE" ,{timeZone: "Africa/Casablanca",year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",hour12: false});

        wssRef.current.send(JSON.stringify( {type : "Create msg", payload : {Msg : msg ,send_id : UserId, reciver_id :  pathid.split("/")[2]}}))
        SetMessagesState((prev) => [...prev , {message_text : msg ,sender_id : UserId ,  created_at  : datemsg }])
        
        console.log(MessagesState);
        msgRef.current.value = '';
    }
    var date_sp : string = "";
    return (
        <>
            <div className="flex flex-col h-full min-h-0 overflow-hidden">

                <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={'/default_profile.png'} alt={"activeContact.name"} className="w-10 h-10 rounded-full" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">{data?.reciver[0].first_name}</h2>
                            <p className="text-xs text-gray-500">{data?.reciver[0].last_name}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <Phone className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                        <Video className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                        <Search className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {
                        MessagesState.length > 0 ? 
                        (
                            <>
                                {MessagesState.map((msg: any, index: number) => {
                                    const isMe = msg.sender_id == UserId;
                                    
                                    var flag : number = 0;
                                    const datecr : any = msg.created_at;
                                    const datemsg =  new Date(datecr).toLocaleString("sv-SE" ,{timeZone: "Africa/Casablanca",year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",hour12: false});
                                    if (date_sp < datemsg.slice(0, 10))
                                    {
                                        date_sp =  datemsg.slice(0, 10);
                                        flag = 1;
                                    }
                                    return (
                                        <div key={index}>
                                            {flag ? 
                                                    <div className="my-4 flex justify-center">
                                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                                                            {date_sp}
                                                        </span>
                                                    </div>
                                            : null }
                                            <div  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                {!isMe && (<img src="/default_profile.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2 self-end mb-5"/>)}
                                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                                    <div className={`px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap ${isMe ? 'bg-primary text-white rounded-t-xl rounded-bl-xl rounded-br-sm' : msg.is_read ? 'bg-white text-gray-700 border border-gray-100 rounded-t-xl rounded-br-xl rounded-bl-sm' : 'bg-gray-500 text-white border border-gray-100 rounded-t-xl rounded-br-xl rounded-bl-sm'}`}>
                                                        {msg.message_text}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 px-1">
                                                        <span className="text-[11px] text-gray-400">
                                                            {datemsg}
                                                        </span>
                                                    </div>
                                                </div>

                                                {isMe && (<img src="/default_profile.png" alt="My Avatar" className="w-8 h-8 rounded-full ml-2 self-end mb-5"/>)}
                                            </div>
                                        
                                        </div>
                                    );
                                })}

                                <div ref={divRef}></div>
                            </>
                        ) : (<img src="/no-messages.png" alt="No messages" className="object-contain h-full mx-auto"/>)
                    }
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                        <input
                            ref={msgRef}
                            type="text"
                            placeholder="Type your message here..."
                            className="flex-1 bg-transparent text-sm focus:outline-none py-2"
                        />
                        <div className="flex items-center gap-3 text-gray-400">
                            <Mic className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
                            <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
                            <button onClick={Handelsendmsg}  className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ml-1 shadow-sm">
                                Send
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}