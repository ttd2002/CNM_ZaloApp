
export const updateUser = async (req, res) => {
    const { name, gender, avatar, birthday } = req.body;
    const id = req.params.id;

    try {
        const user = req.user; // Lấy thông tin người dùng từ middleware đã đăng nhập thành công

        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - Please login first" });
        }
        console.log("id", user._id);
        console.log("req.params.userID", id);
        // Chỉ cho phép người dùng cập nhật thông tin cá nhân của chính họ
        if (user._id.toString() !== id) {
            return res.status(403).json({ error: "Forbidden - You are not allowed to update other user's profile" });
        }

        // Cập nhật thông tin cá nhân của người dùng
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.avatar = avatar || user.avatar;
        user.birthday = birthday || user.birthday;

        // Lưu thay đổi vào cơ sở dữ liệu
        const updatedUser = await user.save();

        // Trả về phản hồi thành công
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            birthday: updatedUser.birthday,
            avatar: updatedUser.avatar,
        });
    } catch (error) {
        console.log("Error in updateUser controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};