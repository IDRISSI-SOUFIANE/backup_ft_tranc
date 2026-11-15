import React from 'react';

type DividerProps = {
  label: string;
};

export default function Divider({ label , textColor , dividerColor}: any) {
  return (
    <div className="flex items-center w-full my-4">
    
      <div className={`grow border-t ${dividerColor}`}></div>
      
    
      <span className={`px-4 text-sm font-medium ${textColor}`}>
        {label}
      </span>
      

      <div className={`grow border-t ${dividerColor}`}></div>
    </div>
  );
}