import express from "express";
import {
    updateUser, getListUsers, getProfile, sendFriendRequest, respondToFriendRequest,
    getListFriendRequest, getStatusOfFriendRequest, getListFriend, deleteFriend
} from "../controllers/userController.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";
import { handleFileSizeError } from "../middlewares/uploadimages.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.put("/updateUser/:id", protectRoute, uploadAvatarMiddleware.single("avatar"), handleFileSizeError, updateUser); //route for updating user
router.get("/getUsers", protectRoute, getListUsers); //route for getting all users
router.get("/profile/:id", protectRoute, getProfile); //route for getting user profile
router.post("/sendFriendRequest/:id", protectRoute, sendFriendRequest); //route for sending friend request,  id is the id of the user to whom the request is to be sent
router.post("/respondToFriendRequest/:id", protectRoute, respondToFriendRequest); //route for responding to friend request, id is the id of the user who sent the request
router.get("/getFriendRequests", protectRoute, getListFriendRequest); //route for getting all friend requests
router.get("/getStatusOfFriendRequest/:id", protectRoute, getStatusOfFriendRequest); //route for getting status of friend request, id is the id of the user who sent the request
router.get("/getFriends", protectRoute, getListFriend); //route for getting all friends
router.delete("/deleteFriend/:id", protectRoute, deleteFriend); //route for deleting friend, id is the id of the friend to be deleted

export default router;