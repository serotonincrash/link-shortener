import mongoose from "mongoose";
import { User } from "../models/userModel.js";

// Session storage type defs
declare module "express-session" {
    interface SessionData {
        _id: mongoose.Types.ObjectId;
        username: string;
        email: string;
    }
}