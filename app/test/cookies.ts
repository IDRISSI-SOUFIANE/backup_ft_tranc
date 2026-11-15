"use server";

import { cookies } from "next/headers";

export async function createSession() {

    const cookieStore = await cookies();

    const ele = cookieStore.get("session_id")?.value ?? null;
    console.log( ele);
    return ele;

}