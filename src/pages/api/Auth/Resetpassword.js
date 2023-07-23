import joi from "joi";
import { Authentication } from "../../../Database/Auth";
import { emails } from "@/utils/regex";

let Auth = new Authentication()

let schema = joi.string().email().required().min(2).pattern(emails)

export default function Resetpassword(req, res) {
    if (req.method === "POST" && req.url === "/api/Auth/Resetpassword") {
        let {value, error} = schema.validate(req.body.email)
        if (error) return res.status(400).json({message: error.details[0].message})
        if(value) return Auth.ResetPassword(res, value)         
    } else {
        res.status(405).json({message:"method not allowed"})
    }
}