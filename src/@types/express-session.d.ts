import { User } from "../models/userModel.js";

// Session storage type defs
declare module "express-session" {
    interface SessionData {
        username: string;
        email: string;
    }
}