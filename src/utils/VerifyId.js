import { GetPhotos } from "./GetPhotos";
import { Album } from "@/Database/Model/AlbumSchema";

export async function VerifyId(AlbumId, user) {
    if (AlbumId === undefined) {
        let Photos = await GetPhotos(user.photos, user._id )
        return Photos
    }
    let album = await Album.findById(AlbumId)
    let Photos = await GetPhotos(album.photos, user._id)
    return Photos
}