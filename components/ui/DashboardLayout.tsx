"use client"

import Navbar from "@/components/ui/Navbar"
import Sidebar from "@/components/ui/Sidebar"
import { ReactNode, useState } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-gray-50">
            {mobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45 md:hidden transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex flex-col flex-1 overflow-hidden w-full">
                <Navbar toggleSidebar={() => setMobileOpen(!mobileOpen)} />
                <main className="p-10 flex-1 w-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
