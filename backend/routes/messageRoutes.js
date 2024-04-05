import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { upload, handleFileSizeError } from "../middlewares/uploadimages.js"; // Import hàm middleware upload từ uploadimages.js

const router = express.Router();

router.post("/send/:id", protectRoute, upload.array("image", 10), handleFileSizeError, sendMessage); // Sử dụng hàm middleware upload

export default router;
