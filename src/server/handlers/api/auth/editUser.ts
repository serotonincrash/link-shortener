import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { loginUser } from "./login.js";
import { logoutUser} from "./logout.js";
import messages from "../../../../static/messages.js";
import bcrypt from "bcryptjs";

async function editUser(req: Request, res: Response) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        for (let error of errors.array()) {
            if (error.param === "newPassword") {
                res.status(400);
                res.send(error.msg);
                return;
            }
        }
        res.status(400);
        res.send(messages.error.bad_request);
        return;
    }
    let username = req.session.username!
    let password = req.body.password!
    let newPassword = req.body.newPassword!
    let newPasswordConfirm = req.body.newPasswordConfirm!
    let email = req.body.email!

    if (newPassword !== newPasswordConfirm) {
        res.status(400);
        res.send(messages.error.bad_request);
        return;
    }

    
    try {
        
        await editUserDetails(username, password, newPassword, email);
        res.send(messages.auth.edit.success);

    } catch (e: any) {
        
        if (e instanceof Error) {
            if (e.message.includes("Login failed")) {
                // User being edited is not logged in?????? idk man
                res.status(403);
                res.send(messages.permissions.cant_do_that);
            } else {
                res.status(500);
                res.send(e.message);
            }  
        }
       
    } finally {
        req.session.destroy((e) => {
            if (e) {
                console.error(e);
            }
        })
        res.end();
    }

}

async function editUserDetails(username: string, password: string, newPassword: string, email: string) {
    let user = await loginUser(username, password);
    
    let newHash = await bcrypt.hash(newPassword, 8);
    user.password = newHash;
    await user.save();

}
export default editUser;