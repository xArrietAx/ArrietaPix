import { imagekit } from "@/Database/ImageKit/config";
import { Authentication } from "@/Database/Auth";
import { verifyToken } from "@/utils/VerifyToken";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

let Auth = new Authentication()
export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/UploadAvatar") {
    let {SECRET} = req.cookies
    if (!SECRET) return res.status(404).json({ redirect:true, message: "Your session has expired" });
    let {base64} = req.body
    if (!base64) return res.status(404).json({message:"The file or name is required"})
    let id = await verifyToken(SECRET)
    let user = await Auth.getUser(id)
    if (user.avatar.filesIds.length >= 10) {
      await imagekit.bulkDeleteFiles(user.avatar.filesIds)
      user.avatar.filesIds = []
      await user.save()
    }
    imagekit.upload({
      file:base64,
      fileName:"Avatar_profile"
    }, async (err, result) => {
      if (err) return res.status(400).json(err)
      user.avatar.name = result.name
      user.avatar.filesIds.push(result.fileId) 
      await user.save()
      return res.status(200).json(user.avatar.name)
    })
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}