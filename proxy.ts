import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSession } from './app/test/cookies';
import { redirect } from 'next/dist/server/api-utils';
import { prisma } from './lib/prisma';
 
// This function can be marked `async` if using `await` inside
export  async function  proxy(request: NextRequest) {
  // console.log("here we are in proxy");
  const UserId : any  =  await createSession();
  if (!UserId)
    return NextResponse.redirect(new URL('/login' , request.url)); // 
  const user = await prisma.users.findMany({where : {id : UserId} , select : {id : true}});
 
  if (user.length <= 0)
    return NextResponse.redirect(new URL('/login' , request.url)); // 

  // console.log("user already logged in : " , request.url , "  -- " , UserId);
  return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ['/chat/:path*'],
}