import cloudinary from "../config/cloudinaryConfig.js";

export async function uploadImage(req, res) {
    // dùng để upload nhiều ảnh cùng lúc
    try {
        const images = req.files.map((file) => file.path);

        const imageUploaded = [];
        for (let image of images) {
            const result = await cloudinary.uploader.upload(image);
            console.log(result);
            imageUploaded.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }

        return res.status(200).json({
            message: "Images uploaded successfully",
            data: imageUploaded,
        });
    } catch (error) {
        console.log("Error in upload file controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function uploadAvatar(req, res) {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Please login first' });
        }

        // Kiểm tra xem có file ảnh được chọn không
        if (!req.file) {
            return res.status(400).json({ error: 'No image file selected' });
        }

        // Kiểm tra xem người dùng chỉ được phép cập nhật avatar của chính họ
        const userId = user._id;
        if (userId.toString() !== req.params.id) {
            return res.status(403).json({ error: "Forbidden - You are not allowed to update other user's avatar" });
        }

        // Upload ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `avatar`,
            public_id: `avt_${userId}`,
            overwrite: true,
            allowed_formats: ['jpg', 'jpeg', 'png']
        });

        // Cập nhật đường dẫn ảnh mới vào cơ sở dữ liệu
        user.avatar = result.secure_url;
        await user.save();

        // Trả về thông tin của ảnh đã upload
        return res.status(200).json({
            message: "Avatar uploaded successfully",
            data: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });

    } catch (error) {
        console.log("Error in upload avatar controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}