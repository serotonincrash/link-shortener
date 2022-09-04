import { Request, Response } from "express";
import messages from "../../../static/messages.js";
function loginChecker(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    if (req.session.username !== undefined) {
        next();
    } else {
        res.status(401);
        res.end(messages.auth.not_logged_in);
        return;
    } 
}

export default loginChecker;