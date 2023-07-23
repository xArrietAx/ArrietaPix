import joi from "joi";
import { verifyKey } from "@/utils/VerifyKey";
import { verifyKey as key } from "@/utils/regex";

const schema = joi.string().required().min(4).max(10).pattern(
    key
  );

  export default async function handler(req, res) {
    if (req.method === "POST") {
      let {key} = req.body;
      let data = {
        email: req.query.email,
        key
      }
      const { error, value } = schema.validate(key);
      if (error) return res.status(400).json({message:"Provide a valid key"});
      if (value)return verifyKey(req, res, data)
    } else {
      return res.status(405).json({ message: "Metodo no permitido" });
    }
}