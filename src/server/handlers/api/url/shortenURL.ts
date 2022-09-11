import { Request, Response } from "express";
import URL from "../../../../models/urlModel.js";
import messages from "../../../../static/messages.js";
async function shortenURL(req: Request<{url: string}>, res: Response) {

    // TODO: validate URL as a HTTP URI before redirecting
    let url = req.params.url;

    try {

        let redirect = await getShortenedURL(url);
        res.status(301);
        res.redirect(redirect);
        return;
    } catch (e: any) {
        // URL not found
        res.redirect("/");
    }
}

async function getShortenedURL(url: string) {
    
    let foundURL = await URL.findOne({shortURL: url});

    if (!foundURL) {
        throw new Error(messages.url.doesnt_exist);
    }

    let redirectURL = foundURL.fullURL

    return redirectURL;
}

export { shortenURL, getShortenedURL };