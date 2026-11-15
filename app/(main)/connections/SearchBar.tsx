"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function SearchBar({ 
  defaultValue = "", 
  placeholder = "Search..." 
}: { 
  defaultValue?: string; 
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(defaultValue);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (text.trim()) {
        params.set("q", text);
      } else {
        params.delete("q");
      }
      params.set("page", "1"); 
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [text, router, pathname, searchParams]);

  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
      />
      {text && (
        <button
          onClick={() => setText("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}