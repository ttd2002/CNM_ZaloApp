import express from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.put("/updateUser/:id", authenticateToken, updateUser); //route for updating user

export default router;