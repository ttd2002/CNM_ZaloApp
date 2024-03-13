import express from "express";
import { signup, login, logout } from "../controllers/authController.js";


const router = express.Router();

router.post("/signup", signup);//route for signup

router.post("/login", login);//route for login

router.post("/logout", logout);//route for logout

export default router;