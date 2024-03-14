import express from "express";
import { signup, login, logout, generateOTP, verifyUser, verifyOTP, createResetSession, resetPassword } from "../controllers/authController.js";
import { localVariable } from "../middlewares/auth.js";


const router = express.Router();

//method POST
router.post("/signup", signup);//route for signup

router.post("/login", login);//route for login

router.post("/logout", logout);//route for logout

//method GET
router.get("/generateOTP", generateOTP, localVariable, verifyUser);//route for generating OTP
router.get("/verifyOTP", verifyOTP);//route for verifying OTP
router.get("/createResetSession", createResetSession); //route for creating reset session

//method PUT
router.put("/resetPassword", resetPassword, verifyUser);//route for reset password

export default router;