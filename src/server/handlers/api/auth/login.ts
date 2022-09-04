import { Request, Response } from "express";
import { User } from "../../../../models/userModel.js";
import bcrypt from "bcryptjs";
import messages from "../../../../static/messages.js";

async function login(req: Request, res: Response) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await loginUser(username, password);
        req.session.username = user.username;
        req.session.email = user.email;
        res.send(messages.login.success);
        
    } catch (e:any) {
        res.status(500);
        if (e instanceof Error) {
            res.send(messages.login.failed);
        }
    } finally {
        res.end();
        return;
    }

}

async function loginUser(username: string, password: string) {
    let user = await User.findOne({$or:[{username: username}, {email: username}]});

    if (user === null) {
        throw new Error("Login failed: user not found")
    }

    // Validate password

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Login failed: incorrect password")
    }
    return user;
}

export default login;