import { Router } from "express";

// Routes
import addURL from "../../handlers/api/url/addURL.js";
import editURL from "../../handlers/api/url/editURL.js";
import getURLs from "../../handlers/api/url/getURLs.js";
import removeURL from "../../handlers/api/url/removeURL.js";
import shortenURL from "../../handlers/api/url/shortenURL.js";

// Middleware
import { body } from "express-validator";
import loginChecker from "../../handlers/helpers/auth/loginCheck.js";
import denyIfURLExists from "../../handlers/helpers/url/denyIfURLExists.js";

// URL /api/url/

let routeURL = Router();
routeURL
.get("/", loginChecker, getURLs)
    .post("/add", body(["shortURL", "fullURL"]).exists(), loginChecker, denyIfURLExists, addURL)
    .put("/edit/:url", loginChecker, editURL)
    .delete("/delete/:url", loginChecker, removeURL)


export default routeURL;