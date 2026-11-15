import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/app/test/cookies";
import { res } from "../quizzes/route";

 // Hardcoded for testing; will swap to NextAuth session later

export async function GET() {
  try {
      const UserId : any  = await createSession();
      const CURRENT_USER_ID =  UserId;
      // console.log("1 here : ", CURRENT_USER_ID);
      if (CURRENT_USER_ID == null)
          return res.json("Invalid User Id " , {status : 404});

    // 1. Fetch the current user to get their location and bio
    const currentUser = await prisma.users.findUnique({
      where: { id: CURRENT_USER_ID },
      select: { location: true, bio: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Extract location keywords (e.g., "Khouribga, Morocco" -> ["Khouribga", "Morocco"])
    const locationKeywords = currentUser.location
      ? currentUser.location.split(",").map((loc) => loc.trim())
      : [];

    const locationFilters = locationKeywords.map((loc) => ({
      location: { contains: loc },
    }));

    // 3. Extract meaningful keywords from the current user's bio (words > 4 letters)
    // E.g., "Software engineering student..." -> ["software", "engineering", "student"]
    const bioKeywords = currentUser.bio
      ? currentUser.bio
          .toLowerCase()
          .replace(/[^\w\s]/g, "") // Remove punctuation
          .split(/\s+/)
          .filter((word) => word.length > 4)
      : [];

    const bioFilters = bioKeywords.map((word) => ({
      bio: { contains: word },
    }));

    // 4. Get all connection records to exclude already interacting users
    const existingConnections = await prisma.connection.findMany({
      where: {
        OR: [{ senderId: CURRENT_USER_ID }, { receiverId: CURRENT_USER_ID }],
      },
      select: { senderId: true, receiverId: true },
    });

    const excludedUserIds = new Set<string>([CURRENT_USER_ID]);
    existingConnections.forEach((conn) => {
      excludedUserIds.add(conn.senderId);
      excludedUserIds.add(conn.receiverId);
    });

    // 5. Fetch users who share the same location (city/country) OR have matching bio keywords
    const suggestions = await prisma.users.findMany({
      where: {
        id: {
          notIn: Array.from(excludedUserIds),
        },
        // Only apply the OR filter if we actually have filters to apply,
        // otherwise Prisma might throw an error on an empty OR array.fsugg
        ...(locationFilters.length > 0 || bioFilters.length > 0
          ? {
              OR: [...locationFilters, ...bioFilters],
            }
          : {}),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        location: true,
        avatar_url: true,
        bio: true,
        lastSeenAt: true,
      },
      take: 10,
    });
    console.log("suggestions: ", suggestions);

    // 6. Fallback: If strict matching returns too few users, fill the rest with generic unconnected users
    if (suggestions.length < 5) {
      const fallbackExcludedIds = new Set([
        ...Array.from(excludedUserIds),
        ...suggestions.map((s) => s.id),
      ]);
  
      const fallbackSuggestions = await prisma.users.findMany({
        where: {
          id: {
            notIn: Array.from(fallbackExcludedIds),
          },
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          location: true,
          avatar_url: true,
          bio: true,
          lastSeenAt: true,
        },
        take: 10 - suggestions.length,
      });
  
      suggestions.push(...fallbackSuggestions);
  }

    // console.log("suggestions fetched:", suggestions);
    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 },
    );
  }
}
