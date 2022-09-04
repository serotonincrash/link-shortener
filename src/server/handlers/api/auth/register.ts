import { Request, Response } from "express";
import { User } from "../../../../models/userModel.js";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";
import messages from "../../../../static/messages.js";

// Password validation schema
let schema = new passwordValidator()
    .is().min(8, "Password should be minimum 8 characters!")
    .is().max(100, "Password should not be more than 100 charcters!")
    .has().lowercase()
    .has().not().spaces(0, "Password should not have any spaces!")

async function register(req: Request, res: Response) {
    // get the information from the request
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    if (username === undefined || password === undefined || email === undefined) {
        res.status(400);
        res.send(messages.error.bad_request);
    }
    try {
        let user = await registerUser(username, password, email);
        req.session.username = user.username;
        req.session.email = user.email;
        res.send(messages.auth.register.success)
        
    } catch (e:any) {
        res.status(500);
        if (e.code === 11000) {
            res.status(400);
            res.send(messages.permissions.user_already_exists);
        } else {
            res.send(e.message);
        }
    } finally {
        res.end();
        return;
    }

}

async function registerUser(username: string, password: string, email: string) {
    // process password
    const validPass = schema.validate(password, { details: true }) as any[]
    if (validPass.length > 0) {
        // At least one rule was broken
        let messages = [];
        for (let reason of validPass) {
            messages.push(reason.message);
        }
        
        throw new Error(messages.toString());

    } else {
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
}

export default register;