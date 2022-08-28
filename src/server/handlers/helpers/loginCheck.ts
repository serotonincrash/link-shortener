import { Request, Response } from "express";

function loginChecker(req: Request, res: Response, next: Function) {
    // Checks whether user is logged in
    if (req.session.username !== undefined) {
        next();
    } else {
        res.status(401);
        res.end("You need to be logged in to do this!");
        return;
    } 
}

export default loginChecker;