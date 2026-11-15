"use client";

import { createSession } from "@/app/test/cookies";
import { useState, useEffect } from "react";

export function useSession() {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        createSession()
            .then(setSessionId)
            .catch(console.error);
    }, []);

    return sessionId;
}