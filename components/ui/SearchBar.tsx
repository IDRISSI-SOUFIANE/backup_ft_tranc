import { ChangeEvent } from "react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search...", className = ""}: SearchBarProps) {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return (
        <div className={`searchContainer relative w-full flex justify-between items-center h-5 ${className}`}>
            <svg
                className="search-icon absolute"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="black">
                    <circle cx="11" cy="11" r="5.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4" />
                </g>
            </svg>

            <input
                value={value}
                onChange={handleChange}
                type="text"
                name="searchBar"
                placeholder={placeholder}
                className="w-full p-[10px_10px_10px_25px] border-default outline-none h-[inherit] text-search-placeholder"
            />
        </div>
    );
}
