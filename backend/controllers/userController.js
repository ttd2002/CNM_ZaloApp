import User from "../models/user.js";

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

//get list of users
export const getListUsers = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getListUsers controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//get Profile user
export const getProfile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json(user);

    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        // Kiểm tra xem người nhận yêu cầu kết bạn có tồn tại không
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "Receiver not found" });
        }

        // Kiểm tra xem đã tồn tại yêu cầu kết bạn giữa hai người dùng này chưa
        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot send friend request to yourself" });
        }

        // Kiểm tra xem đã là bạn bè hay chưa
        if (receiver.friends.includes(senderId)) {
            return res.status(400).json({ error: "You are already friends with this user" });
        }

        // Kiểm tra xem đã gửi yêu cầu kết bạn chưa
        if (receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: "Friend request already sent to this user" });
        }

        // Thêm yêu cầu kết bạn vào danh sách yêu cầu kết bạn của người nhận
        receiver.friendRequests.push(senderId);
        await receiver.save();

        res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        console.log("Error in sendFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getListFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Tìm danh sách yêu cầu kết bạn của người dùng
        const friendRequests = await User.find({ _id: { $in: user.friendRequests } }).select("-friendRequests -friends");

        res.status(200).json(friendRequests);

    } catch (error) {
        console.log("Error in getListFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getStatusOfFriendRequest = async (req, res) => {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    try {
        // Tìm người nhận trong cơ sở dữ liệu
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            throw new Error("Receiver not found");
        }

        // Kiểm tra xem người gửi có trong danh sách bạn bè của người nhận không
        if (receiver.friends.includes(senderId)) {
            return res.status(200).json({ status: "Friends" }); // Nếu có, trả về trạng thái "Friends"
        }

        // Kiểm tra xem người gửi có trong danh sách yêu cầu kết bạn của người nhận không
        if (receiver.friendRequests.includes(senderId)) {
            return res.status(200).json({ status: "Friend request sent" }); // Nếu có, trả về trạng thái "Friend request sent"
        }

        // Nếu không, trả về trạng thái "Add friend"
        return res.status(200).json({ status: "Add friend" });
    } catch (error) {
        console.log("Error in getStatusOfFriendRequest: ", error.message);
        throw new Error("Internal server error");
    }
};


export const respondToFriendRequest = async (req, res) => {
    try {
        const responderId = req.user._id;// Người nhận yêu cầu kết bạn
        const requestId = req.params.id;// Người gửi yêu cầu kết bạn
        const { response } = req.body; // 1: Chấp nhận, 0: Từ chối

        // Kiểm tra xem yêu cầu kết bạn có tồn tại không
        const requester = await User.findById(requestId);
        if (!requester) {
            return res.status(404).json({ error: "Requester not found" });
        }

        // Kiểm tra xem người nhận yêu cầu kết bạn có tồn tại không
        const responder = await User.findById(responderId);
        if (!responder) {
            return res.status(404).json({ error: "Responder not found" });
        }

        // Kiểm tra xem yêu cầu kết bạn có tồn tại trong danh sách yêu cầu kết bạn của người nhận không
        if (!responder.friendRequests.includes(requestId)) {
            return res.status(400).json({ error: "Friend request not found" });
        }

        // Nếu responder chấp nhận yêu cầu kết bạn
        console.log(response);
        if (response === 1) {
            // Thêm người gửi yêu cầu vào danh sách bạn bè của người nhận
            responder.friends.push(requestId);
            await responder.save();

            // Thêm người nhận vào danh sách bạn bè của người gửi yêu cầu
            requester.friends.push(responderId);
            await requester.save();

            // Xóa yêu cầu kết bạn khỏi danh sách yêu cầu kết bạn của người nhận
            responder.friendRequests = responder.friendRequests.filter(id => id.toString() !== requestId.toString());
            await responder.save();

            return res.status(200).json({ message: `You and ${requester.name} are now friends` });
        }

        return res.status(200).json({ message: `You have rejected friend request from ${requester.name}` });

    } catch (error) {
        console.log("Error in respondToFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getListFriend = async (req, res) => {
    try {
        const userId = req.user._id;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Tìm danh sách bạn bè của người dùng
        const friends = await User.find({ _id: { $in: user.friends } }).select("-password -friendRequests -friends");

        if (!friends) {
            return res.status(404).json({ error: "No friends found" });
        }
        return res.status(200).json(friends);

    } catch (error) {
        console.log("Error in getListFriend controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteFriend = async (req, res) => {
    try {
        const userId = req.user._id;
        const friendId = req.params.id;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Kiểm tra xem người bạn có tồn tại không
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }

        // Kiểm tra xem người bạn có trong danh sách bạn bè của người dùng không
        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ error: "This user is not your friend" });
        }

        // Xóa người bạn khỏi danh sách bạn bè của người dùng
        user.friends = user.friends.filter(id => id.toString() !== friendId.toString());
        await user.save();

        // Xóa người dùng khỏi danh sách bạn bè của người bạn
        friend.friends = friend.friends.filter(id => id.toString() !== userId.toString());
        await friend.save();

        res.status(200).json({ message: "Friend deleted successfully" });

    } catch (error) {
        console.log("Error in deleteFriend controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// tìm kiếm người dùng bằng số điện thoại hoặc tên,
// nếu tìm kiếm bằng tên chỉ tìm được người dùng có trong danh sách bạn bè
export const findOtherUser = async (req, res) => {
    try {
        let { keyword } = req.query;

        // Chuyển đổi keyword thành chữ thường
        keyword = keyword.toLowerCase();

        // Tìm kiếm người dùng bằng số điện thoại
        const usersByPhone = await User.find({ phone: keyword }).select("-password");

        // Nếu tìm kiếm bằng tên, chỉ tìm được người dùng là bạn bè
        let usersByName = [];
        if (isNaN(keyword)) {
            // Tìm kiếm theo tên không phân biệt chữ hoa và chữ thường
            usersByName = await User.find({ name: { $regex: new RegExp(keyword, "i") }, friends: req.user._id }).select("-password");
        }

        // Kết hợp kết quả và loại bỏ các bản ghi trùng lặp
        const users = [...usersByPhone, ...usersByName];
        const uniqueUsers = users.filter((user, index) => index === users.findIndex(u => u._id === user._id));

        res.status(200).json(uniqueUsers);
    } catch (error) {
        console.log("Lỗi trong controller findOtherUser:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}