"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "../types";

interface PeopleYouMayKnowProps {
  suggestions: User[];
  onConnect?: (user: User) => void;
}

export default function PeopleYouMayKnow({ suggestions, onConnect }: PeopleYouMayKnowProps) {
  // Pagination & Animation State
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const ITEMS_PER_PAGE = 4;

  // Reset to the first dot whenever the search query or suggestions list changes
  useEffect(() => {
    setCurrentPage(0);
  }, [suggestions]);

  // Smooth page change handler
  const handlePageChange = (index: number) => {
    if (index === currentPage) return; // Do nothing if clicking the active dot
    
    setIsFading(true); // 1. Start fade out
    
    setTimeout(() => {
      setCurrentPage(index); // 2. Swap data while invisible
      setIsFading(false); // 3. Start fade in
    }, 150); // Matches the duration-150 class below
  };

  // Calculate slice
  const totalPages = Math.ceil(suggestions.length / ITEMS_PER_PAGE);
  const currentSuggestions = suggestions.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
        People you may know
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          No new suggestions available right now.
        </p>
      ) : (
        <>
          {/* Added transition-opacity to create the smooth fade effect */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-150 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentSuggestions.map((user: any) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center pb-4 text-center bg-white shadow-sm hover:shadow transition"
              >
                {/* Header / Cover Image */}
                <div className="w-full h-16 bg-linear-to-r from-slate-700 to-slate-900" />

                {/* Avatar overlaying the cover */}
                <div className="relative -mt-8 mb-2 w-16 h-16">
                  <Image
                    src={"https://lh3.googleusercontent.com/a/ACg8ocIH4AbbOKWYjAqBWW0r-e72XDCMJLq7I8c9OU8a1nXeBVQnow=s96-c"}
                    alt={user.first_name}
                    fill
                    className="rounded-full border-2 border-white object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                  />
                </div>

                {/* User details */}
                <div className="px-3 flex-1 flex flex-col items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 min-h-8">
                      {user.bio}
                    </p>
                  </div>

                  {/* Connect Action Button */}
                  <button
                    onClick={() => onConnect?.(user)}
                    className="mt-4 px-5 py-1 text-xs font-semibold rounded-full border border-gray-500 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2.5 mt-6 pt-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const isActive = currentPage === index;
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    aria-label={`Go to page ${index + 1}`}
                    // Added cursor-pointer here
                    className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 ring-2 ring-blue-200 ring-offset-2"
                        : "bg-transparent border border-gray-400 hover:bg-gray-200"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}