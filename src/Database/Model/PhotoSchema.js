import { Schema, model, models } from "mongoose";

const PhotoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    album: {
        type: Schema.Types.ObjectId,
        ref:"Album"
    },
    urlPhoto: {
        type: String,
    },
    IkId: [{
        type:String
    }]
})

export let Photo = models.Photo || model("Photo", PhotoSchema)