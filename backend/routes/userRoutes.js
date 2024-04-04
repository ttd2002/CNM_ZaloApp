import express from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";

const router = express.Router();

router.put("/updateUser/:id", authenticateToken, uploadAvatarMiddleware.single("avatar"), updateUser); //route for updating user

export default router;