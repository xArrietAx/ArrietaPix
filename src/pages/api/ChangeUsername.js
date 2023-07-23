import joi from "joi";
import { User } from "@/Database/Model/UserSchema";
import { verifyToken } from "@/utils/VerifyToken";
import { usernames } from "@/utils/regex";

let Schema = joi
.string()
.required()
.min(3)
.max(16)
.pattern(usernames);

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/ChangeUsername") {
    try {
      let { username } = req.body;
      let { SECRET } = req.cookies;
      if (!SECRET) {
        return res
          .status(404)
          .json({ redirect: true, message: "Your session has expired" });
      }

      if (!username) return res.status(404).json({ message: "The username is required" });

      let { value, error } = Schema.validate(username);

      if (error) return res.status(400).json({ message: "The username is invalid" });

      if (value) {
        const userId = await verifyToken(SECRET)
        const user = await User.findById(userId);
        user.username = value
        await user.save()
        return res.status(200).json({ message: "The username has been changed successfully", newUsername: user.username })
      }

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
