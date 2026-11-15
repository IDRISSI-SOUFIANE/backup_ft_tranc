"use client"

import { useEffect, useState } from "react";

interface ToastProps {
    title?: string;
    message?: string;
    status?: "success" | "failure";
}
export default function Toast({ title, message, status }: ToastProps) {
    const [visible, setVisible] = useState(true);
    const [close, isclose] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) {
        return null;
    }
    if (close) {
        return null;
    }

    return (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
            <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                    {
                        status === "success" ? (<svg className="text-success"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>) : (<svg className="text-danger" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="-2 -3 24 24">
                            <path d="M-2 -3h24v24H-2z" fill="none" />
                            <path fill="currentColor" d="m12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.2 3.2 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096m-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.1 1.1 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1" />
                        </svg>
                        )
                    }

                </div>


                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-title">
                        {title || "Success"}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-text">
                        {message || "User has been added successfully."}
                    </p>
                </div>

                {/* Close */}
                <button onClick={() => isclose(true)}
                    type="button"
                    className="shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-title"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

            </div>
        </div>
    )
   
}