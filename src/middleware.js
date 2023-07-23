import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';

export default async function VerifyToken(req) {
  try {
    const Token = req.cookies.get('SECRET')?.value;
    const secretKey = new TextEncoder().encode(process.env.KEY_JWT)
    await jwtVerify(Token, secretKey)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(process.env.MODE === "dev" ? "http://localhost:3000/Auth/Signin" : "http://localhost:3000/Auth/Signup")
  }
}

export const config = {
  matcher: ["/Dashboard", "/Dashboard/Album/:name*"],
};