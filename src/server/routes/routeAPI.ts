import { Router } from "express";
import routeAuth from "./api/routeAuth.js";
import routeURL from "./api/routeURL.js";
let routerAPI = Router();

routerAPI.use("/auth", routeAuth);
routerAPI.use("/url", routeURL);

export default routerAPI;