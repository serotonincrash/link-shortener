import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;
interface IUser {
    username: string,
    email: string,
    password: string,
}

interface ISessionUser {
    uid: Types.ObjectId,
    username: string,
    email: string,
    password: string,
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    }
)

const User = model<IUser>("users", userSchema);

export { User, ISessionUser };
