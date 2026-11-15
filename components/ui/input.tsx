import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  lefticon?: React.ReactNode;
  righticon?: React.ReactNode;
}

export default function Input({ className = "", ...props }: InputProps) {

  const baseStyles = "w-full rounded-lg px-4 py-2.5 border-2 text-text outline-none transition disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100";
  const inputStyles = props.error ? "border-danger focus:border-danger" : "border-gray-500 focus:border-primary";

  return (
    <div className="w-full">
      <div className="relative">
        {props.lefticon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {props.lefticon}
          </span>
        )}
        {props.righticon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {props.righticon}
          </span>
        )}

        <input
          disabled={props.disabled}
          className={`
            ${baseStyles}
            ${inputStyles}
            ${props.lefticon ? "pl-10" : ""}
            ${props.righticon ? "pr-10" : ""}
            ${className}
            
          `}

          {...props}
        />
      </div>
      {props.error && (
        <p className="mt-1 text-sm text-danger">
          {props.error}
        </p>
      )}
    </div>
  );
}