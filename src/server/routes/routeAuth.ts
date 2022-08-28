import { Router } from "express";
import denyIfLoggedIn from "../handlers/helpers/denyIfLoggedIn.js";
import loginChecker from "../handlers/helpers/loginCheck.js";
import deleteUser from "../handlers/api/auth/deleteUser.js";
import editUser from "../handlers/api/auth/editUser.js";
import login from "../handlers/api/auth/login.js";
import register from "../handlers/api/auth/register.js";
import logout from "../handlers/api/auth/logout.js";
// Route /api/auth/
const routeAuth = Router();

routeAuth.get("/login", denyIfLoggedIn, login);
routeAuth.get("/logout", loginChecker, logout);
routeAuth.post("/register", denyIfLoggedIn, register);
routeAuth.put("/user", loginChecker, editUser);
routeAuth.delete("/user", loginChecker, deleteUser);

export default routeAuth;