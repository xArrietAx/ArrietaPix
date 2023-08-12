import joi from "joi";
import { Album } from "@/Database/Model/AlbumSchema";
import { User } from "@/Database/Model/UserSchema";
import { verifyToken } from "@/utils/VerifyToken";
import { GetAlbums } from "@/utils/GetAlbums";
import { albumsName } from "@/const/regex";


let Schema = joi.string().required().min(2).max(20).pattern(
  albumsName
);

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/AddAlbum") {
    try {
      let { SECRET } = req.cookies;
      if (!SECRET) return res.status(404).json({ redirect: true, message: "Your session has expired" });
      let { name } = req.body;
      if (!name)return res.status(404).json({ message: "The name is required" });
      let { value, error } = Schema.validate(name);
      if (error)
        return res.status(400).json({ message: "The name is invalid" });

      if (value) {
        let id = await verifyToken(SECRET)
        let user = await User.findById(id);

        const existingAlbum = await Album.findOne({ owner: user._id, name: value });
        if (existingAlbum) {
          return res.status(400).json({ message: "An album with the same name already exists" });
        }

        if (user.albums.length >= 5) {
          return res.status(400).json({message:"The max number of albums was exceeded"})
        }
        
        let album = await new Album({owner: user._id, name: value})
        
        await album.save()
        user.albums.push(album._id)
        await user.save()
        let albums = await GetAlbums(user.albums, user._id)
        res.status(200).json(albums)
      }

    } catch (err) {
      res.status(500).json({message:"Internal server error"})
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}