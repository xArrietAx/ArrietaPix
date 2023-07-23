import { verifyToken } from "@/utils/VerifyToken";
import { VerifyId } from "@/utils/VerifyId";
import { User } from "@/Database/Model/UserSchema";
import { Album } from "@/Database/Model/AlbumSchema";
import { Photo } from "@/Database/Model/PhotoSchema";
import { imagekit } from "@/Database/ImageKit/config";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/DeletePhoto") {
    try {
      let { Photoid, Albumid } = req.body;
      if (!Photoid) return res.status(404).json("Choose a Photo")
      let { SECRET } = req.cookies;
      if (!SECRET) {
        return res
        .status(404)
        .json({ redirect: true, message: "Your session has expired" });
      }

      let UserId = await verifyToken(SECRET);
      let user = await User.findById(UserId);
      let photo = await Photo.findByIdAndDelete(Photoid);
      let album = await Album.findById(photo.album)
      user.photos.pull(photo._id)
      album.photos.pull(photo._id)
      await imagekit.bulkDeleteFiles(photo.IkId)
      
      await user.save()
      await album.save()

      let Photos = await VerifyId(Albumid, user)

      res.status(200).json({Photos, TotalFiles: user.photos.length})

    } catch (err) {
      console.log(err);
      res.status(500).json({message:"Internal Server Error"});
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
