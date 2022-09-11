import { Request, Response } from "express";
import URL from "../../../../models/urlModel.js";
import messages from "../../../../static/messages.js";

async function denyIfURLExists(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    let url = req.body.shortURL!

    let foundURL = await URL.findOne({shortURL: url});

    if (!foundURL) {
        next();
    } else {
        res.status(403);
        res.end(messages.url.already_exists);
        return;
    }
}

export default denyIfURLExists;