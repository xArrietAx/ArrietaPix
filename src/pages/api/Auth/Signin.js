import joi from "joi";
import { Authentication } from "@/Database/Auth";
import { emails, passwords } from "@/utils/regex";

let Auth = new Authentication()

let schema = new joi.object({
        email: joi.string().email().required().min(2).pattern(
        emails
        ),
        password: joi.string().min(8).required().pattern(
            passwords
        )
})

export default function Signin(req, res) {
    if (req.method === "POST" && req.url === "/api/Auth/Signin") {
        let {value, error} = schema.validate(req.body)
        if (error) return res.status(400).json({message: error.details[0].message})
        if(value) return Auth.SignIn(req, res, value)         
    } else {
        res.status(405).json({message:"method not allowed"})
    }
}