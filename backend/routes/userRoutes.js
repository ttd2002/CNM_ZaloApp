import express from "express";
import { updateUser, getListUsers, getProfile } from "../controllers/userController.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";
import { handleFileSizeError } from "../middlewares/uploadimages.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.put("/updateUser/:id", protectRoute, uploadAvatarMiddleware.single("avatar"), handleFileSizeError, updateUser); //route for updating user
router.get("/getUsers", protectRoute, getListUsers); //route for getting all users
router.get("/profile/:id", protectRoute, getProfile); //route for getting user profile

export default router;