import express from "express";
import { updateUser, getListUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";
import { handleFileSizeError } from "../middlewares/uploadimages.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.put("/updateUser/:id", authenticateToken, uploadAvatarMiddleware.single("avatar"), handleFileSizeError, updateUser); //route for updating user
router.get("/getUsers", protectRoute, getListUsers); //route for getting all users

export default router;