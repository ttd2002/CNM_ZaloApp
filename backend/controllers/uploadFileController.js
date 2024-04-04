import User from '../models/user.js';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';

export async function uploadImage(req, res) {
    try {
        const images = req.file.map(file => file.path);

        const imageUploaded = [];
        for (let image of images) {
            const result = await cloudinary.uploader.upload(image);
            console.log(result);
            imageUploaded.push({
                url: result.secure_url,
                public_id: result.public_id
            });

        }

        return res.status(200).json({
            message: "Images uploaded successfully",
            data: imageUploaded
        });

    } catch (error) {
        console.log("Error in upload file controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}