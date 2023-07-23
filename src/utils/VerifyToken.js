import { jwtVerify } from "jose";

export async function verifyToken(Token) {
      const secretKey = new TextEncoder().encode(process.env.KEY_JWT);
      let {
        payload: { sub },
      } = await jwtVerify(Token, secretKey);
      return sub;
}