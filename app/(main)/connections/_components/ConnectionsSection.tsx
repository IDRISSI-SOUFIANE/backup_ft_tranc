// "use client";

// import Image from "next/image";
// import { Connection } from "../types";

// interface ConnectionsSectionProps {
//   connections: Connection[];
//   currentUserId: string | null;
//   onRemove?: (connectionId: string) => void;
// }

// export default function ConnectionsSection({ connections, currentUserId, onRemove }: ConnectionsSectionProps) {

//   // console.log("connections: ", connections);
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 w-full">
//       <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3">
//         Connections ({connections.length})
//       </h2>

//       {connections.length === 0 ? (
//         <p className="text-xs text-gray-500 py-4 text-center">
//           You don't have any connections yet.
//         </p>
//       ) :
//       (
//         <div className="divide-y divide-gray-100">
          
//           {connections.map((conn) => {
//             const friend : any = conn.senderId === currentUserId ? conn.receiver : conn.sender;

//             if (!friend)
//               return null;

//             return (
//               <div
//                 key={conn.id}
//                 className="flex items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
//               >
//                 <div className="flex items-center gap-2 min-w-0">
//                   <div className="relative w-9 h-9 shrink-0">
//                     <Image
//                       src={ "/avatars/avatar_2.jpg"}
//                       alt={friend.first_name}
//                       fill
//                       className="rounded-full object-cover"
//                       sizes="36px"
//                       loading="eager"
//                     />
//                   </div>
//                   <h3 className="text-xs font-normal text-gray-900 truncate">
//                     {friend.first_name} {friend.last_name}
//                   </h3>
//                 </div>

//                 <button
//                   onClick={() => onRemove?.(conn.id)}
//                   className="shrink-0 px-2.5 py-1 text-[14px] rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import Image from "next/image";
import { Connection } from "../types";

interface ConnectionsSectionProps {
  connections: Connection[];
  currentUserId: string | null;
  onRemove?: (connectionId: string) => void;
}

export default function ConnectionsSection({ 
  connections, 
  currentUserId, 
  onRemove 
}: ConnectionsSectionProps) {

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 w-full flex flex-col">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3 shrink-0">
        Connections ({connections.length})
      </h2>

      {connections.length === 0 ? (
        <p className="text-xs text-gray-500 py-4 text-center">
          You don't have any connections yet.
        </p>
      ) : (
        // SCROLLABLE WRAPPER ADDED HERE
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto overscroll-contain pr-1 sm:pr-2
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-200 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {connections.map((conn) => {
            const friend: any = conn.senderId === currentUserId ? conn.receiver : conn.sender;

            if (!friend) return null;

            return (
              <div
                key={conn.id}
                className="flex items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-9 h-9 shrink-0">
                    <Image
                      src={"/avatars/avatar_2.jpg"}
                      alt={friend.first_name}
                      fill
                      className="rounded-full object-cover"
                      sizes="36px"
                      loading="eager"
                    />
                  </div>
                  <h3 className="text-xs font-normal text-gray-900 truncate">
                    {friend.first_name} {friend.last_name}
                  </h3>
                </div>

                <button
                  onClick={() => onRemove?.(conn.id)}
                  className="shrink-0 px-2.5 py-1 text-[14px] rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}