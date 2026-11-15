"use client";

import { useState } from "react";
import Image from "next/image";
import { Connection } from "../types";

interface InvitationsSectionProps {
  receivedInvitations: Connection[];
  sentInvitations: Connection[];
  onAccept: (connectionId: string) => void;
  onReject: (connectionId: string) => void;
  onCancel: (connectionId: string) => void;
}

export default function InvitationsSection({ receivedInvitations, sentInvitations, onAccept, onReject, onCancel}: InvitationsSectionProps)
{
  const [tab, setTab] = useState<"received" | "sent">("received");

  const total = receivedInvitations.length + sentInvitations.length;
  const list = tab === "received" ? receivedInvitations : sentInvitations;

  // Small on phones, bigger from sm (640px) up
  const btnBase =
    "shrink-0 whitespace-nowrap text-center rounded-full transition " +
    "px-2.5 py-1 text-[11px] " +
    "sm:px-4 sm:py-1.5 sm:text-sm";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 w-full flex flex-col">
      <h2 className="truncate text-base sm:text-lg font-bold text-gray-900 mb-3">
        Invitations ({total})
      </h2>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-3 border-b border-gray-100">
        {(["received", "sent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 whitespace-nowrap rounded-full capitalize transition px-2 py-0.5 text-[11px] sm:px-4 sm:py-1.5 sm:text-sm cursor-pointer ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-xs sm:text-sm text-gray-500 py-4 text-center">
          No {tab} invitations.
        </p>
      ) : (
        // SCROLLABLE WRAPPER ADDED HERE
        <div className="divide-y divide-gray-100 max-h-100 overflow-y-auto overscroll-contain pr-1 sm:pr-2 
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-200 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {list.map((conn) => {
            const person: any = tab === "received" ? conn.sender : conn.receiver;
            if (!person) return null;

            return (
              <div
                key={conn.id}
                className="flex items-center gap-2 sm:gap-3 py-3 last:pb-0"
              >
                <div className="flex flex-1 min-w-0 items-center gap-2 sm:gap-3">
                  <div className="relative shrink-0 w-9 h-9 sm:w-12 sm:h-12">
                    <Image
                      src={"/avatars/avatar_5.jpg"}
                      alt={person.first_name}
                      fill
                      className="rounded-full object-cover"
                      sizes="(min-width: 640px) 48px, 36px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-base font-semibold text-gray-900 truncate">
                      {person.first_name} {person.last_name}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 truncate">
                      {person.bio}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2">
                  {tab === "received" ? (
                    <>
                      <button
                        onClick={() => onReject(conn.id)}
                        className={`${btnBase} cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50`}
                      >
                        Ignore
                      </button>
                      <button
                        onClick={() => onAccept(conn.id)}
                        className={`${btnBase} cursor-pointer bg-blue-600 text-white hover:bg-blue-700`}
                      >
                        Accept
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onCancel(conn.id)}
                      className={`${btnBase} cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50`}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
