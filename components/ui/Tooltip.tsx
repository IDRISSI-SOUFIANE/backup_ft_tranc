import React, { ReactNode } from 'react';



export default function Tooltip({ placement = 'top', content, children }: any) {

  const placements : any = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrows :any = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2",
    left: "right-[-4px] top-1/2 -translate-y-1/2",
    right: "left-[-4px] top-1/2 -translate-y-1/2",
  };

  return (
    <div className="relative inline-flex group items-center justify-center">
      {children}

      <div
        role="tooltip"
        className={`absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm whitespace-nowrap ${placements[placement]}`}
      >
        {content}
        <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${arrows[placement]}`}></div>
      </div>
    </div>
  );
}