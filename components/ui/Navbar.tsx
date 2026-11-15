"use client";

import { useState } from "react";

const icon = (path: string, size = 20) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <header className="h-18 px-4 md:px-8 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-5">
                {toggleSidebar && (
                    <button 
                        onClick={toggleSidebar} 
                        className="md:hidden p-2.5 text-gray-600 rounded-xl hover:bg-gray-100/80 active:scale-95 transition-all"
                    >
                        {icon("M4 6h16M4 12h16M4 18h16")}
                    </button>
                )}
                
                <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gray-100/50 hover:bg-gray-100/80 rounded-2xl w-72 text-gray-500 focus-within:bg-white! focus-within:ring-2 focus-within:ring-[#7367f0]/20 focus-within:shadow-sm transition-all duration-300 group">
                    <span className="text-gray-400 group-focus-within:text-[#7367f0] transition-colors">
                        {icon("M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0z", 18)}
                    </span>
                    <input 
                        className="bg-transparent border-none outline-none text-[15px] text-gray-800 w-full placeholder-gray-400 font-medium"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="hidden lg:flex items-center justify-center px-2 py-1 rounded bg-white shadow-sm border border-gray-200 text-[10px] font-bold text-gray-400 tracking-widest">
                        ⌘K
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative w-11 h-11 rounded-full border border-gray-200/60 bg-white/50 text-gray-600 flex items-center justify-center hover:bg-gray-50 hover:shadow-sm active:scale-95 transition-all duration-200">
                    {icon("M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0", 22)}
                    <span className="absolute 1 top-0 right-0 min-w-4.5 h-4.5 px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">3</span>
                </button>

                <div className="relative">
                    <button 
                        className="flex items-center gap-3 border border-gray-200/60 bg-white/50 rounded-full p-1.5 pr-4 hover:bg-gray-50 hover:shadow-sm active:scale-95 transition-all duration-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#7367f0] to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-inner">MK</div>
                        <div className="hidden md:block text-left">
                            <div className="text-[14px] font-bold text-gray-800 leading-none mb-0.5">Mehdi K.</div>
                            <div className="text-[11px] font-medium text-gray-500 leading-none">Admin</div>
                        </div>
                        <span className={`text-gray-400 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>
                            {icon("M6 9l6 6 6-6", 16)}
                        </span>
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-[110%] w-56 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                            <div className="px-3 py-2 border-b border-gray-50 mb-1 md:hidden">
                                <div className="text-[14px] font-bold text-gray-800">Mehdi K.</div>
                                <div className="text-[11px] font-medium text-gray-500">Admin</div>
                            </div>
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 text-left w-full transition-colors">
                                {icon("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", 18)}
                                Mon profil
                            </button>
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 text-left w-full transition-colors">
                                {icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z", 18)}
                                Paramètres
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2" />
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-red-600 hover:bg-red-50 text-left w-full transition-colors group">
                                <span className="group-hover:scale-110 transition-transform">
                                    {icon("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9", 18)}
                                </span>
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}