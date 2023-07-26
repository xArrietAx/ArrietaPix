import { setCookie } from "cookies-next";
import { verifyEmail } from "@/utils/VerifyEmail";
import { generateToken } from "./GenerateToken";
import { verifyToken } from "./VerifyToken";
import {compare} from "bcrypt";

export async function verifyKey(req, res, data) {
    try {
      let {email, key} = data
      let user = await verifyEmail(email)
      if (!user) return res.status(404).json({ message: "Error finding your email" });
      let keybcrypt = await verifyToken(user.TokenJWTResetPassword)
      let keyCompared = await compare(key, keybcrypt);
      if(!keyCompared) return res.status(404).json({ message:"Provide a valid key" });
      let Token = await generateToken(user._id, "5m")
      setCookie('RESET', Token, { 
        req, 
        res, 
        httpOnly: true,
        expires: new Date(Date.now() + (5 * 60 * 1000)),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev")
      });
      return res.status(200).json({ok:true})
    } catch (err) {
     if (err.code === "ERR_JWT_EXPIRED") {
      return res.status(500).json({message:"Key expired, try again!"})
     }
      return res.status(500).json({message:"Internal Server Error"})
    }
   }
