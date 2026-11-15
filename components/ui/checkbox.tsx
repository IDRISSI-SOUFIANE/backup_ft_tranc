import React, { InputHTMLAttributes } from "react";



interface Checkbox extends InputHTMLAttributes<HTMLInputElement>{
    children: React.ReactNode
}

export default function ({children, className = "",...props}:Checkbox){

    return(
        <label className="flex items-center gap-2">
            <input type="checkbox"  className={`h-4 w-4 accent-primary ${className}`} {...props}/>
            {children}
        </label>
    );
}