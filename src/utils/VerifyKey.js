import { setCookie } from "cookies-next";
import { Authentication } from "@/Database/Auth";
import { generateToken } from "./GenerateToken";
import { verifyToken } from "./VerifyToken";
import {compare} from "bcrypt";

let Auth = new Authentication()

export async function verifyKey(req, res, data) {
    try {
      let {email, key} = data
      let user = await Auth.verifyEmail(res, email, "Unexpected error")
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
      console.log(err);
      return res.status(500).json({message:"Internal Server Error"})
    }
   }
