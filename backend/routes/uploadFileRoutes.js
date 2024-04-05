import express from 'express';
import { uploadImage } from "../controllers/uploadFileController.js";
import { upload, handleFileSizeError } from "../middlewares/uploadimages.js";
import { uploadAvatar } from '../controllers/uploadFileController.js';
import { uploadAvatarMiddleware } from "../middlewares/uploadAvatar.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/uploadImage', upload.array('images', 10), uploadImage);
router.post('/uploadAvatar/:id', protectRoute, uploadAvatarMiddleware.single('avatar'), handleFileSizeError, uploadAvatar);


export default router;