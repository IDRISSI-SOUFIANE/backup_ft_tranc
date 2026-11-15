import { Search } from "lucide-react";
import ChatList from "./ChatList";

export default function ChatLayout({ children }: any) {
    return (
        <>
            <div className="flex flex-col h-full bg-[#F8F8F9] font-sans">
                <div className="flex flex-1 overflow-hidden p-6 max-w-[1600px] mx-auto w-full">
                    <div className="flex w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="w-80 flex flex-col border-r border-gray-100 bg-white shrink-0">
                            {/* Sidebar Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                                <img src={'/default_profile.png'} alt="Profile" className="w-10 h-10 rounded-full" />
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Contacts & Chats List */}
                            <ChatList/>
                        </div>


                        <main className="flex-1 flex flex-col ">

                            {children}

                        </main>

                    </div>
                </div>

            </div>
        </>
    )
}