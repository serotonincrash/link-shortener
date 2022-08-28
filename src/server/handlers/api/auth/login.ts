import { Request, Response } from "express";
import { User } from "../../../../models/userModel.js";
import { Crypt } from "unpc";
import { BCryptHashingAdapter } from "unpc/bcrypt";

const crypt = new Crypt(
    {
        default: "bcrypt",
        adapters: [BCryptHashingAdapter]
    }
)

async function login(req: Request, res: Response) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await loginUser(username, password);
        res.send("Logged in successfully.");
        req.session.username = user.username;
        req.session.email = user.email;
    } catch (e:any) {
        res.status(500);
        if (e instanceof Error) {
            res.send("Login failed");
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

    let isPasswordCorrect = await crypt.verify(user.password, password);

    if (!isPasswordCorrect) {
        throw new Error("Login failed: incorrect password")
    }
    return user;
}

export default login;