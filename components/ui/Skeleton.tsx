import React from 'react';

export default function Skeleton() {
  return (
    <div className="flex items-start gap-4 p-4 w-full animate-pulse">
      
      
      
      <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>

      <div className="flex-1 space-y-3">
        <div className="w-24 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-3/4 h-16 bg-gray-200 rounded-xl rounded-tl-none"></div>
      </div>
      
    </div>
  );
}