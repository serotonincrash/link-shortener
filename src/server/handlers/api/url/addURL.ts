import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import URL from "../../../../models/urlModel.js"
import messages from "../../../../static/messages.js";
import { Types } from "mongoose";
async function addURL(req: Request, res: Response) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.send(messages.error.bad_request);
        return;
    }

    let shortURL = req.body.shortURL!;
    let longURL = req.body.fullURL!;
    let creatorID = req.session._id!;
    let password = req.body.password;
    
    try {
        await addLink(shortURL, longURL, creatorID, password);
        res.send(messages.url.add.success);
    } catch (e: any) {
        res.status(500);
        if (e.code === 11000) {
            res.status(403);
            res.send(messages.url.already_exists);
        } else {
            res.status(400);
            res.send(e.message);
        }
    } finally {
        res.end();
    }
}

async function addLink(shortURL: string, fullURL: string, creatorID: Types.ObjectId, password?: string) {
    let url = new URL(); 
    url.shortURL = shortURL;
    url.fullURL = fullURL;
    url.creator = creatorID;
    if (password) {
        url.password = password;
    }
    url.save();
}
export default addURL;