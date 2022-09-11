import { Router } from "express";

// Middleware
import { body } from "express-validator";
import denyIfLoggedIn from "../handlers/helpers/auth/denyIfLoggedIn.js";
import loginChecker from "../handlers/helpers/auth/loginCheck.js";

// Routes
import deleteUser from "../handlers/api/auth/deleteUser.js";
import editUser from "../handlers/api/auth/editUser.js";
import { login } from "../handlers/api/auth/login.js";
import register from "../handlers/api/auth/register.js";
import { logout } from "../handlers/api/auth/logout.js";
import validPass from "../handlers/helpers/auth/passwordValidate.js";
// Route /api/auth/
const routeAuth = Router();

routeAuth.get("/login", body(["username", "password"]).exists(), 
denyIfLoggedIn, login)
.get("/logout", loginChecker, logout)
.post("/register", body(["username", "email", "password", "passwordConfirm"]).exists(), body("password").custom(validPass), denyIfLoggedIn, register)
.put("/user", body(["username", "password", "newPassword", "newPasswordConfirm", "email"]).exists(), body("newPassword").custom(validPass), loginChecker, editUser)
routeAuth.delete("/user", loginChecker, deleteUser);

export default routeAuth;