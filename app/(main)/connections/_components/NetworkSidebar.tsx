// // setActiveTab: (tab: "invitations" | "connections") => void;
// // 3lach mhtajin `tab:` weech darouri


"use client";

interface NetworkSidebarProps {
  activeTab: "invitations" | "connections";
  setActiveTab: (tab: "invitations" | "connections") => void;
  invitationsCount: number;
  connectionsCount: number;
}

export default function NetworkSidebar({activeTab, setActiveTab, invitationsCount, connectionsCount}: NetworkSidebarProps) {
  const itemClass = (tab: "invitations" | "connections") =>
    `flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
      activeTab === tab
        ? "bg-info/10 text-blue-700 cursor-pointer"
        : "text-gray-700 hover:bg-gray-50 cursor-pointer"
    }`;

  const badgeClass =
    "bg-gray-100 text-gray-800 text-[11px] px-2 py-0.5 rounded-full shrink-0";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 w-full">
      <h2 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2 mb-2">
        Manage my network
      </h2>
      <nav className="flex flex-col space-y-1">
        <button
          onClick={() => setActiveTab("invitations")}
          className={itemClass("invitations")}
        >
          <span>Invitations</span>
          <span className={badgeClass}>{invitationsCount}</span>
        </button>

        <button
          onClick={() => setActiveTab("connections")}
          className={itemClass("connections")}
        >
          <span>Connections</span>
          <span className={badgeClass}>{connectionsCount}</span>
        </button>
      </nav>
    </div>
  );
}