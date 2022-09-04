import { Router } from "express";
import { body } from "express-validator"; 
import denyIfLoggedIn from "../handlers/helpers/denyIfLoggedIn.js";
import loginChecker from "../handlers/helpers/loginCheck.js";
import deleteUser from "../handlers/api/auth/deleteUser.js";
import editUser from "../handlers/api/auth/editUser.js";
import login from "../handlers/api/auth/login.js";
import register from "../handlers/api/auth/register.js";
import logout from "../handlers/api/auth/logout.js";
// Route /api/auth/
const routeAuth = Router();

routeAuth.get("/login", body(["username", "password"]).exists(), 
denyIfLoggedIn, login);
routeAuth.get("/logout", loginChecker, logout);
routeAuth.post("/register", body(["username", "email", "password", "passwordConfirm"]).exists(), denyIfLoggedIn, register);
routeAuth.put("/user", body(["username", "password", "newPassword", "newPasswordConfirm"]).exists(), loginChecker, editUser);
routeAuth.delete("/user", loginChecker, deleteUser);

export default routeAuth;