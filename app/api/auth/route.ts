import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, first_name, last_name, password } = body;
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const password_hash = password;
    const user = await prisma.users.create({
      data: { email:email, first_name:first_name, last_name:last_name, password_hash:password_hash , phone_number:'1022' , status : "EMPLOYEE"},
    });

    const res = NextResponse.json({ ok: true, id: user.id });
    res.cookies.set("session_id", user.id, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}