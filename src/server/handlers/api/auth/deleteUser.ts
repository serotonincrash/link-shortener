import { Request, Response } from "express";
import messages from "../../../../static/messages.js";
import { User } from "../../../../models/userModel.js";

async function deleteUser(req: Request, res: Response) {
    let username = req.session.username!;

    try {
        await delUser(username);
        res.send(messages.auth.delete.success);
        req.session.destroy((e) => {});
    } catch (e: any) {
        res.status(500);
        if (e instanceof Error) {
            res.send(messages.error.internal_error);
        }

    } finally {
        res.end();
    }
}

async function delUser(username: string) {
    let user = await User.findOne({ username: username });
    if (user !== null) {
        await user.delete();
    } else {
        throw new Error("User does not exist");
    }
}
export default deleteUser;