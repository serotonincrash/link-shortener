import { Request, Response } from "express";
import messages from "../../../../static/messages.js";
async function loginChecker(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    if (req.session._id !== undefined) {
        next();
    } else {
        res.status(401);
        res.end(messages.permissions.not_logged_in);
        return;
    } 
}

export default loginChecker;