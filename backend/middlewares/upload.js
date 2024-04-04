import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        format: /jpeg|jpg|png/
    },
});

export const upload = multer({ storage: storage });