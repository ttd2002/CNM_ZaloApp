import express from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";
import { handleFileSizeError } from "../middlewares/uploadimages.js";

const router = express.Router();

router.put("/updateUser/:id", authenticateToken, uploadAvatarMiddleware.single("avatar"), handleFileSizeError, updateUser); //route for updating user

export default router;