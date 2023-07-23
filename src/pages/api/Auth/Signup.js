import joi from "joi";
import { Authentication } from "@/Database/Auth";
import { passwords, emails, usernames } from "@/utils/regex";

let Auth = new Authentication()

let schema = new joi.object({
    username: joi.string().required().min(3).max(16).pattern(
        usernames
    ),
    email: joi.string().email().required().min(2).pattern(
       emails
    ),
    password: joi.string().min(8).required().pattern(
        passwords
    )
})

export default function Signup(req, res) {
    if (req.method === "POST" && req.url === "/api/Auth/Signup") {
        let {value, error} = schema.validate(req.body)
        if (error) return res.status(400).json({message: "Invalid data"})
        if(value) return Auth.SignUp(res, value)         
    } else {
        res.status(405).json({message:"method not allowed"})
    }
}