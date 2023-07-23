import { SignJWT } from "jose";

export async function generateToken(sub, ExpTime){
    const secretKey = new TextEncoder().encode(process.env.KEY_JWT)
    let Token = await new SignJWT({ sub }).setProtectedHeader({alg: process.env.ALG_JWT}).setExpirationTime(ExpTime).sign(secretKey)
    return Token  
}