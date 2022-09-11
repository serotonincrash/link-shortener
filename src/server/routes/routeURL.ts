import type { Express } from "express";
import addURL from "../handlers/api/url/addURL.js";
import editURL from "../handlers/api/url/editURL.js";
import getURLs from "../handlers/api/url/getURLs.js";
import removeURL from "../handlers/api/url/removeURL.js";
import shortenURL from "../handlers/api/url/shortenURL.js";
import loginChecker from "../handlers/helpers/loginCheck.js";

// URL /api/url/
function routeURL(app: Express) {
    app.get("/:url", shortenURL)
    .get("/api/url/", loginChecker, getURLs)
    .post("/api/url/add", loginChecker, addURL)
    .put("/api/url/edit/:url", loginChecker, editURL)
    .delete("/api/url/delete/:url", loginChecker, removeURL)
}

export default routeURL;