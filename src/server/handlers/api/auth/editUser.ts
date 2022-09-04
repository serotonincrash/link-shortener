import { Request, Response } from "express";
import { validationResult } from "express-validator";
import messages from "../../../../static/messages.js";

async function editUser(req: Request, res: Response) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.send(messages.error.bad_request);
    }

}

export default editUser;