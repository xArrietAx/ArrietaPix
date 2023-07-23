import {hash, genSalt} from "bcrypt";
import { generateToken } from "./GenerateToken";

export async function generateKey() {
    const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = ''
    for (let i = 0; i < 10; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
     let salt = await genSalt(12)
     let keybcrypt = await hash(key, salt)
     let Token = await generateToken(keybcrypt, "5m")
     return {key, Token}
  }