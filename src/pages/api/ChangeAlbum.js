import joi from "joi";
import { verifyToken } from "@/utils/VerifyToken";
import { VerifyId } from "@/utils/VerifyId";
import { albumsName } from "@/const/regex";
import { User } from "@/Database/Model/UserSchema";
import { Album } from "@/Database/Model/AlbumSchema";
import { Photo } from "@/Database/Model/PhotoSchema";

let Schema = joi
  .string()
  .required()
  .min(2)
  .max(20)
  .pattern(albumsName);

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/ChangeAlbum") {
    try {
      let { id, name, Albumid } = req.body;
      let { SECRET } = req.cookies;
      if (!SECRET) {
        return res
          .status(404)
          .json({ redirect: true, message: "Your session has expired" });
      }
      if (!name)
        return res.status(404).json({ message: "The name is required" });
      if (!id) return res.status(404).json({ message: "The id is required" });

      let { value, error } = Schema.validate(name);

      if (error) return res.status(400).json({ message: "The name is invalid" });

      if (value) {

        const userId = await verifyToken(SECRET)
        let user = await User.findById(userId)
      
        const photo = await Photo.findById(id);

        if (!photo) {
          return res.status(404).json({ message: "Photo not found" });
        }

        const currentAlbum = await Album.findById(photo.album);
        
        const newAlbum = await Album.findOne({ owner: user._id, name: value });

        if (!newAlbum) {
          return res.status(404).json({ message: "Album not found" });
        }

        if (currentAlbum) { 
          currentAlbum.photos.pull(photo._id.toString())
          await currentAlbum.save()
        }
        
        photo.album = newAlbum._id;

        newAlbum.photos.push(photo._id);
      
        await newAlbum.save()
        await photo.save()

        let Photos = await VerifyId(Albumid, user)
        return res.status(200).json({ message: "Album changed successfully", Photos })

      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
