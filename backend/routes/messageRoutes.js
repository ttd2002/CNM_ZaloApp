import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { upload, handleFileSizeError } from "../middlewares/uploadimages.js"; // Import hàm middleware upload từ uploadimages.js

const router = express.Router();

router.post("/send/:id", protectRoute, upload.array("image", 10), handleFileSizeError, sendMessage); // Sử dụng hàm middleware upload
router.get("/get/:id", protectRoute, getMessages); // Thêm route mới để lấy tin nhắn giữa 2 người dùng

export default router;
