import { Request, Response } from "express";
import { User } from "../../../../models/userModel.js";
import { validationResult } from "express-validator";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";
import messages from "../../../../static/messages.js";

// Password validation schema
let schema = new passwordValidator()
    .is().min(8, messages.auth.password.min_chars)
    .is().max(100, messages.auth.password.max_chars)
    .has().lowercase(0)
    .has().not().spaces(0, messages.auth.password.no_spaces);

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
        res.send(messages.auth.register.success)

    } catch (e: any) {
        res.status(500);
        if (e.code === 11000) {
            res.status(400);
            res.send(messages.permissions.user_already_exists);
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

    const validPass = schema.validate(password, { details: true }) as any[]
    if (validPass.length > 0) {
        // At least one rule was broken
        let messages = [];
        for (let reason of validPass) {
            messages.push(reason.message);
        }

        throw new Error(messages.toString());

    }

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