import express from 'express';
import { uploadImage } from "../controllers/uploadFileController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post('/uploadImage', upload.array('image', 10), uploadImage);


export default router;