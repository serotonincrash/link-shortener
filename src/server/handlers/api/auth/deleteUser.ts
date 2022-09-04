import { Request, Response } from "express";
import messages from "../../../../static/messages.js";

async function deleteUser(req: Request, res: Response) {
    let username = req.session.username!;

}

export default deleteUser;