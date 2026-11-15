"use client";

// import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icon = (path?: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

const SID_ITEMS = [
    { label: "Home", href: "/dashboard", icon: icon("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10") },
    { label: "Sessions", href: "/sessions", icon: icon("M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4zM5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z") },
    { label: "Projets", href: "/projects", icon: icon("M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z") },
    { label: "Équipe", href: "/team", icon: icon("M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75") },
    { label: "Calendrier", href: "/calendar", icon: icon("M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z") },
    { label: "Rapports", href: "/reports", icon: icon("M3 3v18h18M7 15l4-6 3 4 5-8") },
    {
        label: "Chats", href: "/chat", svg: (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
            <path d="M0 0h16v16H0z" fill="none" />
            <path fill="currentColor" d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0a1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0a1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
        </svg>
        )
    },
    {
        label: "Quiz", href: "/quizzes", svg: (<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" strokeLinejoin="round" d="M20.5 14v-3.5c0-2.335 0-3.502-.472-4.386a4 4 0 0 0-1.642-1.642C17.502 4 16.335 4 14 4a2 2 0 1 0-4 0c-2.335 0-3.502 0-4.386.472a4 4 0 0 0-1.642 1.642C3.5 6.998 3.5 8.165 3.5 10.5V14c0 3.771 0 5.657 1.172 6.828S7.729 22 11.5 22h1c3.771 0 5.657 0 6.828-1.172S20.5 17.771 20.5 14Z" />
                <path strokeLinecap="round" d="M6.5 10h4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 11s.5 0 1 1c0 0 1.588-2.5 3-3" />
                <path strokeLinecap="round" d="M6.5 16h4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 17s.5 0 1 1c0 0 1.588-2.5 3-3" />
            </g>
        </svg>
        )
    },

    { label: "Friends", href: "/friends", icon: icon("M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-2.8-3.8 M17 3.22a4 4 0 0 1 0 7.56") },
    { label: "Paramètres", href: "/settings", icon: icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z") },

];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean, setMobileOpen?: (val: boolean) => void }) {
    const pathname = usePathname();

    return (
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[15px] font-extrabold text-gray-900 tracking-tight">ft_transandance</div>
                        <div className="text-[11px] font-semibold text-[#7367f0] uppercase tracking-wider">Platform</div>
                    </div>
                </div>
                {setMobileOpen && (
                    <button className="md:hidden text-gray-500" onClick={() => setMobileOpen(false)}>
                        ✕
                    </button>
                )}
            </div>

            <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-1">
                {SID_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-[#7367f0] text-white'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {item?.icon || item?.svg}
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#7367f0] flex items-center justify-center font-semibold text-sm">
                    MK
                </div>
                <div>
                    <div className="text-[13px] font-semibold text-gray-900">Mehdi K.</div>
                    <div className="text-xs text-gray-500">Administrateur</div>
                </div>
            </div>
        </aside>
    );
}