import { Request, Response } from "express";
import messages from "../../../../static/messages.js"
async function logout(req: Request, res: Response) {
    try {
        await logoutUser(req);
        res.send(messages.auth.logout.success);
    } catch (e: any) {
        console.error(e);
        res.status(500);
        res.send(messages.auth.logout.failed);
    } finally {
        res.end();
    }
    
    
}

async function logoutUser(req: Request)  {
    req.session.destroy((e) => {
        if (e) {
            throw e;
        }
    })
}
export default logout;