import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png'],
    params: {
        folder: 'images',
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn kích thước 5MB
}); // Sử dụng single() để chỉ upload 1 file

// Middleware để xử lý lỗi khi file vượt quá kích thước
const handleFileSizeError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Kiểm tra nếu lỗi là do file quá lớn
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File size exceeds the limit of 5MB" });
        }
    }
    // Chuyển lỗi cho middleware error tiếp theo xử lý (nếu có)
    next(err);
};

export { upload, handleFileSizeError };
