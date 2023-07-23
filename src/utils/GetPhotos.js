import { Photo } from "@/Database/Model/PhotoSchema";

export const GetPhotos = async (PhotosIds, userId) => {
    let getPhotos = await Photo.find({_id:{$in:PhotosIds}, owner: userId})
    let Photos = getPhotos.map(Photo => {
        return {
            _id: Photo._id,
            album: Photo.album,
            Url: Photo.urlPhoto,
            IkId: Photo.IkId,
        }
    })
    return Photos
}
