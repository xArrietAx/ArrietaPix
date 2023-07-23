import { Album } from "@/Database/Model/AlbumSchema";
import { User } from "@/Database/Model/UserSchema";
import { verifyToken } from "@/utils/VerifyToken";
import { GetAlbums } from "@/utils/GetAlbums";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/DeleteAlbum") {
    try {
      let { SECRET } = req.cookies;
      if (!SECRET)return res.status(404).json({ redirect: true, message: "Your session has expired" });
      let {id} = req.body
      console.log(id);
      let userId = await verifyToken(SECRET)
      let user = await User.findById(userId)
      user.albums = user.albums.pull(id)
      await Album.findByIdAndDelete(id)
      await user.save()
      let albums = await GetAlbums(user.albums, user._id)
      res.status(200).json(albums)
    } catch (err) {
      res.status(500).json({message:"Internal server error"})
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}