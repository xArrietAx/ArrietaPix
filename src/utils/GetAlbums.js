import { Album } from "@/Database/Model/AlbumSchema";

export const GetAlbums = async (AlbumsIds, userId) => {
    let getAlbums = await Album.find({_id:{$in:AlbumsIds}, owner: userId})
    let Albums = getAlbums.map(album => {
        return {
            _id: album._id,
            name: album.name,
            photos: album.photos
        }
    })
    return Albums
}
