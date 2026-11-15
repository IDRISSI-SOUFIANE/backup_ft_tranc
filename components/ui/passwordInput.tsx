"use client"

import React, {InputHTMLAttributes, useState } from "react";

interface PasswordInput extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function PasswordInput({className = "", ...props}:PasswordInput){

    const [showflag, setshowflag] = useState(false);
    function handle_hide_icon()
    {
        showflag ? setshowflag(false) : setshowflag(true);
    }

    const baseStyles = "pr-10 w-full rounded-lg px-4 py-2.5 border-3 text-text outline-none transition disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100";
    const inputStyles = props.error ? "border-danger focus:border-danger" : "border-gray-500 focus:border-primary";

    return(
        <div className="w-full">
            <div className="relative">
                <input className={`${baseStyles} ${inputStyles} ${className}`}
                placeholder="Enter Password" 
                type={showflag ? "text" : "password"}  {...props}/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2" onClick={handle_hide_icon}>
                    {showflag ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7" />
                    </svg>}
                </span> 
            </div>
            <p className={`mt-1 text-sm text-danger ${props.error ? "visible" : "invisible"}`}>
                {props.error ? props.error : "nothing"}
            </p>
        </div>
    );
}