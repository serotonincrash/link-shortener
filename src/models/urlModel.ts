import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;
interface IURL {
    shortURL: string,
    fullURL: string,
    password: string,
    creator: mongoose.Types.ObjectId,
}

const urlSchema = new Schema<IURL>(
    {
        shortURL: { type: String, unique: true, required: true },
        fullURL: { type: String, unique: true, required: true },
        password: { type: String },
        creator: { type: Schema.Types.ObjectId, ref: "users" } 
    }
)

const URL = model<IURL>("urls", urlSchema);

export default URL;