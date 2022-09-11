import { Router } from "express";
import shortenURL from "../handlers/api/url/shortenURL.js";

// URL /:url
let routeShortenedLinks = Router();

routeShortenedLinks.get("/", shortenURL);

export default routeShortenedLinks;