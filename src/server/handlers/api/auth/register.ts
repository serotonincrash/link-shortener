import { Request, Response } from "express";
import { User } from "../../../../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import messages from "../../../../static/messages.js";

async function register(req: Request, res: Response) {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        for (let error of errors.array()) {
            if (error.param === "password") {
                res.status(400);
                res.send(error.msg);
                return;
            }
        }

        res.status(400);
        res.send(messages.error.bad_request);
        return;
    }

    let username = req.body.username;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;
    let email = req.body.email;

    try {
        let user = await registerUser(username, password, passwordConfirm, email);
        req.session.username = user.username;
        req.session.email = user.email;
        req.session._id = user._id;
        res.send(messages.auth.register.success)

    } catch (e: any) {
        res.status(500);
        if (e.code === 11000) {
            res.status(403);
            res.send(messages.auth.user_already_exists);
        } else {
            res.status(400);
            res.send(e.message);
        }
    } finally {
        res.end();
        return;
    }

}

async function registerUser(username: string, password: string, passwordConfirm: string, email: string) {

    if (password !== passwordConfirm) {
        let err = new Error("Your passwords aren't the same!");
        throw err;

    }
    // password is valid, hash it and create user
    const hash = await bcrypt.hash(password, 8);
    let user = await User.create(
        {
            username: username,
            password: hash,
            email: email
        }
    )

    return user;

}

export default register;