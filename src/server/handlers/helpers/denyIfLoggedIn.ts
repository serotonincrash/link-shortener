import { Request, Response } from "express";
import messages from "../../../static/messages.js";

function denyIfLoggedIn(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    if (req.session.username !== undefined) {
        res.status(403);
        res.end(messages.not_allowed);
        return;
    } else {
        next();
    } 
}

export default denyIfLoggedIn;