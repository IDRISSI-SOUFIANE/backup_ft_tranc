// /** WHY USING REF  WHY NOT JUST USE SOCKET DIRECTLY */
"use client";

import { useState, useEffect, useRef } from "react";
import NetworkSidebar from "./_components/NetworkSidebar";
import InvitationsSection from "./_components/InvitationsSection";
import ConnectionsSection from "./_components/ConnectionsSection";
import PeopleYouMayKnow from "./_components/PeopleYouMayKnow";
import { Connection, User } from "./types";
import { useSession } from "@/hooks/useSession";
import SearchBar from "@/components/ui/SearchBar";

export default function ConnectionsPage() {
  const CURRENT_USER_ID: any = useSession();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState<"invitations" | "connections">("invitations");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  const wsRef = useRef<WebSocket | null>(null);

  // ==========================================
  // 1. FIRST USEEFFECT: FETCH ALL DATA AT ONCE
  // ==========================================
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [connRes, suggRes, usersRes] = await Promise.all([
          fetch("/api/connections"),
          fetch("/api/suggestions"),
          fetch("/api/users"),
        ]);

        if (!connRes.ok) throw new Error("Failed to load connections");
        const connData = await connRes.json();

        if (!suggRes.ok) throw new Error("Failed to load suggestions");
        const suggData = await suggRes.json();

        if (!usersRes.ok) throw new Error("Failed to load users table");
        const usersData = await usersRes.json();

        setConnections(connData);
        setSuggestions(suggData);
        setAllUsers(usersData);
      } catch (err) {
        console.error("Failed to load network data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ==========================================
  // 2. SECOND USEEFFECT: WEBSOCKET LIFECYCLE
  // ==========================================
  useEffect(() => {
    if (!CURRENT_USER_ID) return;

    const socket = new WebSocket("ws://localhost:3000/ws");
    wsRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", sessionId: CURRENT_USER_ID }));
    };

    // socket.onmessage = (event) => {
    //   const msg = JSON.parse(event.data);

    //   if (msg.type === "connection_update") {
    //     const { action, data } = msg.payload;

    //     if (action === "NEW_INVITE") {
    //       setConnections((prev) => [...prev, data]);
    //     } else if (action === "ACCEPTED") {
    //       setConnections((prev) =>
    //         prev.map((c) => (c.id === data.id ? data : c))
    //       );
    //     } else if (action === "REMOVED") {
    //       setConnections((prev) =>
    //         prev.map((c) => (c.id === data.id ? { ...c, status: "REJECTED" } : c))
    //       );
    //     }
    //   }
    // };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "connection_update") {
        const { action, data } = msg.payload;

        if (action === "NEW_INVITE") {
          setConnections((prev) => [...prev, data]);
        } else if (action === "ACCEPTED") {
          // PRO-TIP: Only update the status. If you replace the whole object with 'data', 
          // you might lose the user's avatar/bio if the backend doesn't send it back!
          setConnections((prev) =>
            prev.map((c) => (c.id === data.id ? { ...c, status: "ACCEPTED" } : c))
          );
        } else if (action === "REMOVED") {
          // Drop it entirely from the other person's screen
          setConnections((prev) => prev.filter((c) => c.id !== data.id));
        }
      }
    };
    

    return () => {
      socket.close();
      wsRef.current = null;
    };
  }, [CURRENT_USER_ID]);

  // ==========================================
  // 3. SEARCH & FILTERING LOGIC
  // ==========================================
  const query = text.toLowerCase().trim();

  const matchesSearch = (user?: { first_name?: string; last_name?: string }) => {
    if (!query) return true;
    if (!user) return false;

    const firstName = user.first_name?.toLowerCase() || "";
    const lastName = user.last_name?.toLowerCase() || "";
    const fullName = `${firstName} ${lastName}`;

    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      fullName.includes(query)
    );
  };

  // Only ACCEPTED status connections show in Connections tab
  const acceptedConnections = connections.filter((c) => {
    if (c.status !== "ACCEPTED") return false;
    const friend = c.senderId === CURRENT_USER_ID ? c.receiver : c.sender;
    return matchesSearch(friend);
  });

  // Only PENDING status received invitations
  const receivedInvitations = connections.filter((c) => {
    if (c.status !== "PENDING" || c.receiverId !== CURRENT_USER_ID) return false;
    return matchesSearch(c.sender);
  });

  // Only PENDING status sent invitations
  const sentInvitations = connections.filter((c) => {
    if (c.status !== "PENDING" || c.senderId !== CURRENT_USER_ID) return false;
    return matchesSearch(c.receiver);
  });

  // EXCLUDE ONLY ACTIVE OR PENDING USERS FROM SUGGESTIONS
  // REJECTED users are NOT added here, allowing them to appear in suggestions/search
  const excludedUserIds = new Set<string>([CURRENT_USER_ID]);
  connections.forEach((c) => {
    if (c.status === "ACCEPTED" || c.status === "PENDING") {
      excludedUserIds.add(c.senderId);
      excludedUserIds.add(c.receiverId);
    }
  });

  console.log("excludedUserIds: ", excludedUserIds);

  // Non-connected/rejected users available for suggestions & search
  const nonConnectedUsers = allUsers.filter((u) => !excludedUserIds.has(u.id));

  console.log("nonConnectedUsers: ", nonConnectedUsers);

  const displayedSuggestions = query
    ? nonConnectedUsers.filter((u) => matchesSearch(u))
    : suggestions.filter((u) => !excludedUserIds.has(u.id));

  const totalInvitationsCount = connections.filter((c) => c.status === "PENDING").length;
  const totalConnectionsCount = connections.filter((c) => c.status === "ACCEPTED").length;


  console.log("suggestions: ", suggestions);


  // ==========================================
  // 4. ACTION HANDLERS
  // ==========================================
  // const handleAccept = async (connectionId: string) => {
  //   try {
  //     const res = await fetch(`/api/connections/${connectionId}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ action: "ACCEPT" }),
  //     });

  //     if (res.ok) {
  //       const updatedConn = await res.json();
  //       setConnections((prev) =>
  //         prev.map((c) => (c.id === connectionId ? updatedConn : c))
  //       );

  //       if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
  //         wsRef.current.send(
  //           JSON.stringify({
  //             type: "connection_action",
  //             payload: {
  //               senderId: CURRENT_USER_ID,
  //               receiverId: updatedConn.senderId,
  //               action: "ACCEPTED",
  //               connectionData: updatedConn,
  //             },
  //           })
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Failed to accept connection:", err);
  //   }
  // };

const handleAccept = async (connectionId: string) => {
    try {
      const res = await fetch(`/api/connections/${connectionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ACCEPT" }),
      });

      if (res.ok) {
        // Update your screen safely, keeping the existing user data
        setConnections((prev) =>
          prev.map((c) => (c.id === connectionId ? { ...c, status: "ACCEPTED" } : c))
        );

        const connectionToAccept = connections.find((c) => c.id === connectionId);
        
        if (connectionToAccept && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: "connection_action",
              payload: {
                senderId: CURRENT_USER_ID,
                receiverId: connectionToAccept.senderId,
                action: "ACCEPTED",
                connectionData: { id: connectionId },
              },
            })
          );
        }
      }
    } catch (err) {
      console.error("Failed to accept connection:", err);
    }
  };


  // const handleRejectOrDelete = async (connectionId: string) => {
  //   try {
  //     const connectionToRemove = connections.find((c) => c.id === connectionId);

  //     const res = await fetch(`/api/connections/${connectionId}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       const updatedConn = await res.json();

  //       // Status becomes REJECTED -> User leaves Connections and enters Suggestions
  //       setConnections((prev) =>
  //         prev.map((c) => (c.id === connectionId ? updatedConn : c))
  //       );

  //       if (
  //         connectionToRemove &&
  //         wsRef.current &&
  //         wsRef.current.readyState === WebSocket.OPEN
  //       ) {
  //         const otherUserId =
  //           connectionToRemove.senderId === CURRENT_USER_ID
  //             ? connectionToRemove.receiverId
  //             : connectionToRemove.senderId;

  //         wsRef.current.send(
  //           JSON.stringify({
  //             type: "connection_action",
  //             payload: {
  //               senderId: CURRENT_USER_ID,
  //               receiverId: otherUserId,
  //               action: "REMOVED",
  //               connectionData: updatedConn,
  //             },
  //           })
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Failed to remove connection:", err);
  //   }
  // };


const handleRejectOrDelete = async (connectionId: string) => {
    try {
      const connectionToRemove = connections.find((c) => c.id === connectionId);
      if (!connectionToRemove) return;

      const res = await fetch(`/api/connections/${connectionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // 1. Instantly remove it from your own screen using .filter()
        setConnections((prev) => prev.filter((c) => c.id !== connectionId));

        // 2. Tell the other person's browser to also remove it
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const otherUserId =
            connectionToRemove.senderId === CURRENT_USER_ID
              ? connectionToRemove.receiverId
              : connectionToRemove.senderId;

          wsRef.current.send(
            JSON.stringify({
              type: "connection_action",
              payload: {
                senderId: CURRENT_USER_ID,
                receiverId: otherUserId,
                action: "REMOVED",
                connectionData: { id: connectionId }, // Just send the ID
              },
            })
          );
        }
      }
    } catch (err) {
      console.error("Failed to remove connection:", err);
    }
  };

  const handleConnect = async (targetUser: User) => {
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: targetUser.id }),
      });

      if (res.ok) {
        const newConnection = await res.json();

        // If the record previously existed as REJECTED, update it to PENDING in state
        setConnections((prev) => {
          const exists = prev.some((c) => c.id === newConnection.id);
          return exists
            ? prev.map((c) => (c.id === newConnection.id ? newConnection : c))
            : [...prev, newConnection];
        });

        setSuggestions((prev) => prev.filter((u) => u.id !== targetUser.id));

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: "connection_action",
              payload: {
                senderId: CURRENT_USER_ID,
                receiverId: targetUser.id,
                action: "NEW_INVITE",
                connectionData: newConnection,
              },
            })
          );
        }
      }
    } catch (err) {
      console.error("Failed to send connection request:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading your network...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef] py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Search Bar */}
        <div className="col-span-full">
          <SearchBar
            value={text}
            onChange={setText}
            placeholder="Search all users by first or last name..."
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NetworkSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            invitationsCount={totalInvitationsCount}
            connectionsCount={totalConnectionsCount}
          />
        </div>

        {/* Main Section */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "invitations" ? (
            <InvitationsSection
              receivedInvitations={receivedInvitations}
              sentInvitations={sentInvitations}
              onAccept={handleAccept}
              onReject={handleRejectOrDelete}
              onCancel={handleRejectOrDelete}
            />
          ) : (
            <ConnectionsSection
              connections={acceptedConnections}
              currentUserId={CURRENT_USER_ID}
              onRemove={handleRejectOrDelete}
            />
          )}

          {/* People You May Know (Includes users without active/pending connections) */}
          <PeopleYouMayKnow
            suggestions={displayedSuggestions}
            onConnect={handleConnect}
          />
        </div>
      </div>
    </div>
  );
}
