import { Request, Response } from "express";
import { validationResult } from "express-validator";
import messages from "../../../../static/messages.js";
async function addURL(req: Request, res: Response) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.send(messages.error.bad_request);
        return;
    }

    let url = req.body.url!

    try {
        await addLink(url);
        res.send(messages.url.add.success);
    } catch (e: any) {
        res.status(500);
        if (e.code === 11000) {
            res.status(403);
            res.send(messages.permissions.url_already_exists);
        } else {
            res.status(400);
            res.send(e.message);
        }
    } finally {
        res.end();
    }
}

async function addLink(url: string) {

}
export default addURL;