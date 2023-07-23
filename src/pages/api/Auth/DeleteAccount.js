import { Authentication } from "@/Database/Auth";

let Auth = new Authentication()

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/Auth/DeleteAccount") {
    let {SECRET} = req.cookies
    if (!SECRET) return res.status(404).json({ redirect:true, message: "Your session has expired" });
    await Auth.deleteAccount(res, res, SECRET)
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}