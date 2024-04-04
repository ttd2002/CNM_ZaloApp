import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png'],
    params: {
        folder: 'avatar',
    },
    // filename: (req, file, cb) => {
    //     req.body.public_id = `avt_${req.body.phone}_${Date.now().toString()}`;
    //     cb(null, file.originalname);
    // }
});

export const uploadAvatarMiddleware = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        // Add file filter logic here if needed
        cb(null, true);
    },
});