"use client"

import React, { ReactNode, useState } from "react";

interface AlertProps {
  variant?: "success" | "danger" | "warning" | "info";
  children: ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export default function ({variant = "success", position = 'top-left', ...props}:AlertProps)
{
    const [visible, setVisible] = useState(true);
    const variantStyles = {
            success: "border-l-3 border-green-500 bg-green-200",
            danger: "border-l-3 border-red-500 bg-red-200",
            warning: "border-l-3 border-orange-500 bg-orange-200",
            info: "border-l-3 border-sky-500 bg-sky-200",
            };
    const names = {
            success: "SUCCESS",
            danger: "DANGER",
            warning: "WARNING",
            info: "INFO",
            };
    const variantIcons = {
    success: (<svg className="h-8 w-8 text-success" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
            <path d="M0 0h1024v1024H0z" fill="none" />
            <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.8 536.4l-99.5-99.6a38.4 38.4 0 1 0-54.4 54.3L429.1 682a38.3 38.3 0 0 0 54.3 0l262.4-262.5a38.4 38.4 0 1 0-54.3-54.3z" />
            </svg>
    ),

    danger: (<svg className="h-8 w-8 text-danger"  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 4.627a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m.75 8.996v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 1.5 0" />
        </svg>
    ),

    warning: (<svg className="h-8 w-8 text-warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
        <path d="M0 0h1024v1024H0z" fill="none" />
        <path fill="currentColor" d="m955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48M480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8zm32 352a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96" />
        </svg>
    ),

    info: (<svg  className="h-8 w-8 text-info" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
        <path d="M0 0h1024v1024H0z" fill="none" />
        <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372" />
        <path fill="currentColor" d="M464 336a48 48 0 1 0 96 0a48 48 0 1 0-96 0m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8" />
        </svg>
    ),
    };

    const positionStyles = {
        'top-left': 'justify-start items-start',
        'top-right': 'justify-end items-start',
        'bottom-left': 'justify-start items-end',
        'bottom-right': 'justify-end items-end',
    };
    
    function handle()
    {
        setVisible(false);
    }
    if (!visible)
        return null;

    return(
        <div className={`fixed inset-0 z-50 pointer-events-none flex ${positionStyles[position]}`}>
          <div className="pointer-events-auto my-4 mx-4 w-1/2 max-md:w-[calc(100%-2rem)]">          
                <div className={` rounded-lg flex w-full px-4 py-3 ${variantStyles[variant]}`}>
                    <div className="flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                        <span className="mr-2 h-8 w-8">{variantIcons[variant]}</span>
                        <h1 className="text-black font-bold ">{names[variant]} : </h1>
                    </div>
                    <p className="text-black">{props.children}</p>
                    </div>
                    <button
                    type="button"
                    onClick={handle}
                    className="
                        font-bold
                        ml-auto
                        inline-flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        text-current
                        opacity-70
                        transition
                        hover:bg-black/5
                        hover:opacity-100
                        focus:outline-none
                        
                    "
                    >
                    x
                    </button>
                
                </div>
            </div>
        </div>
    );
}