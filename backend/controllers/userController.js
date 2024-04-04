export const updateUser = async (req, res) => {
    const { name, gender, birthday, avatar } = req.body;
    const id = req.params.id;

    try {
        const user = req.user; // Lấy thông tin người dùng từ middleware đã đăng nhập thành công

        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - Please login first" });
        }

        // Chỉ cho phép người dùng cập nhật thông tin cá nhân của chính họ
        if (user._id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden - You are not allowed to update other user's profile" });
        }

        // console.log(req.file);
        if (req.file) {
            user.avatar = req.file.path;
        }


        // Cập nhật thông tin cá nhân của người dùng
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.birthday = birthday || user.birthday;

        // Lưu thay đổi vào cơ sở dữ liệu
        const updatedUser = await user.save();

        // Tạo object phản hồi
        const responseObject = {
            _id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            birthday: updatedUser.birthday,
            avatar: updatedUser.avatar,
        };
        // Trả về phản hồi thành công
        res.status(200).json(responseObject);
    } catch (error) {
        console.log("Error in updateUser controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
