import { Request, Response } from "express";

async function shortenURL(req: Request, res: Response) {

    res.end("It works!")
}

export default shortenURL;