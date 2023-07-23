import { Schema, model, models } from "mongoose";

let AlbumSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    photos:[{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }],
    name:{
        type: String,
        required: true
    }
})

export let Album = models.Album || model("Album", AlbumSchema)