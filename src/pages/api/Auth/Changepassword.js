import joi from "joi";
import { Authentication } from "@/Database/Auth";
import { passwords } from "@/utils/regex";

let schema = joi.object({
 password: joi.string().required().min(8).pattern(
   passwords
  ),
  confirmpassword: joi.string().required().min(8).pattern(
   passwords
  )
})

let Auth = new Authentication()

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/Auth/Changepassword") {
    let {RESET} = req.cookies
    if (!RESET) return res.status(404).json({ redirect:true, message: "You are not authorized!" });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    if (value) {
      if (req.body.password === req.body.confirmpassword) {
           let data = {
             Token: RESET,
             newPassword: req.body.password
           }
           return Auth.changePassword(req, res, data)
     } else {
      return res.status(400).json({ message: "Passwords are not the same" });
     }
    }
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}
