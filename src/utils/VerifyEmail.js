import { User } from "@/Database/Model/UserSchema";

export async function verifyEmail(email) {
    let user = await User.findOne({ email });
    if (!user) return null;
    return user;
}