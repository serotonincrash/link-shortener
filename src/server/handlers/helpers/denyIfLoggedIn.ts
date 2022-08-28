import { Request, Response } from "express";

function denyIfLoggedIn(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    if (req.session.username !== undefined) {
        res.status(403);
        res.end("You're not allowed to do this!");
        return;
    } else {
        next();
    } 
}

export default denyIfLoggedIn;