import joi from "joi";
import { Album } from "@/Database/Model/AlbumSchema";
import { Photo } from "@/Database/Model/PhotoSchema";
import { User } from "@/Database/Model/UserSchema";
import { imagekit } from "../../Database/ImageKit/config";
import { verifyToken } from "@/utils/VerifyToken";
import { VerifyId } from "@/utils/VerifyId";
import { albumsName } from "@/utils/regex";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

let Schema = joi
.string()
.required()
.min(2)
.max(20)
.pattern(albumsName);

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/UploadPhoto") {
    let { SECRET } = req.cookies;
    if (!SECRET) {
      return res
        .status(404)
        .json({ redirect: true, message: "Your session has expired" });
    }
    let { base64, album, AlbumId } = req.body;
    if (!base64)
      return res.status(404).json({ message: "The file is required" });
    let { error, value } = Schema.validate(album);
    if (error)
      return res.status(400).json({ message: "The album name is invalid" });
    if (value) {
      let id = await verifyToken(SECRET);
      let user = await User.findById(id);
      let album = await Album.findOne({ owner: user._id, name: value });
      if (!album) {
        return res.status(404).json({ message: "The album doesn't exist" });
      }
      if (user.photos.length >= 30) {
        return res.status(404).json({ message: "You can only have 4 photos" });
      }
      imagekit.upload({
          file: base64,
          fileName: "img_"
        },
        async function (error, result) {
          if (error) console.log(error);
          else {
            let newPhoto = await Photo({
              owner: user._id,
              album: album._id,
              urlPhoto: result.name,
              IkId: result.fileId
            })
            user.photos.push(newPhoto._id);
            album.photos.push(newPhoto._id);
            await user.save()
            await album.save()
            await newPhoto.save()
            let photos = await VerifyId(AlbumId, user)
            res.status(200).json({totalFiles: user.photos.length, photos});
          }
        });
    }
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}
