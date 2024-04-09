import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSoketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        // console.log("Sender ID: ", senderId);
        // console.log("Receiver ID: ", receiverId);

        if (!senderId || !receiverId) {
            return res
                .status(400)
                .json({ error: "Sender ID and Receiver ID are required" });
        }

        // Kiểm tra xem đã có cuộc trò chuyện giữa 2 người dùng chưa
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        let imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
                imageUrls.push(file.path); // Lấy đường dẫn của các hình ảnh từ req.files
            }
        }

        const newMessage = new Message({
            senderID: senderId,
            receiverID: receiverId,
            messages: [
                {
                    content,
                    image: imageUrls,
                },
            ],
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO
        const receiverSocketId = getReceiverSoketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }


        const messages = conversation.messages.map((message) => {
            if (message.deletedBy.includes(senderID)) {
                // Lọc tin nhắn và thay thế các tin nhắn đã bị xóa bằng thông báo "Tin nhắn đã bị xóa"
                return {
                    ...message._doc,
                    deletedContent: "This message has been deleted",
                };
            } else if (message.recalled) {
                // Lọc tin nhắn và thay thế các tin nhắn đã bị thu hồi bằng thông báo "Tin nhắn đã bị thu hồi"
                return {
                    ...message._doc,
                    recalledContent: "This message has been recalled",
                };
            } else {
                return message;
            }
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const userID = req.user._id;

        const message = await Message.findById(messageId);

        // Kiểm tra xem tin nhắn có tồn tại không
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // Kiểm tra xem tin nhắn đã được thu hồi trước đó chưa
        if (message.recalled) {
            return res
                .status(400)
                .json({
                    error: "This message has already been recalled and cannot be deleted",
                });
        }

        // Kiểm tra xem người yêu cầu xóa tin nhắn có phải là người gửi hoặc người nhận không
        if (
            message.senderID.toString() !== userID.toString() &&
            message.receiverID.toString() !== userID.toString()
        ) {
            return res
                .status(403)
                .json({ error: "You are not allowed to delete this message" });
        }

        // Kiểm tra xem tin nhắn đã được xóa bởi người yêu cầu trước đó chưa
        if (message.deletedBy.includes(userID)) {
            return res
                .status(400)
                .json({ error: "This message has already been deleted by you" });
        }

        // Thêm ID của người yêu cầu vào mảng deletedBy để đánh dấu rằng họ đã xóa tin nhắn này
        message.deletedBy.push(userID);
        await message.save();

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log("Error in deleteMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const recallMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const userID = req.user._id;

        const message = await Message.findById(messageId);

        // Kiểm tra xem tin nhắn có tồn tại không
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // Kiểm tra xem tin nhắn đã được xóa trước đó chưa
        if (message.deletedBy.includes(userID)) {
            return res
                .status(400)
                .json({
                    error: "This message has already been deleted and cannot be recalled",
                });
        }

        // Kiểm tra xem người yêu cầu thu hồi tin nhắn có phải là người gửi tin nhắn không
        console.log(message.senderID.toString());
        console.log(userID.toString());
        if (message.senderID.toString() !== userID.toString()) {
            return res
                .status(403)
                .json({ error: "You are not allowed to recall this message" });
        }

        // Kiểm tra xem tin nhắn đã được thu hồi trước đó chưa
        if (message.recalled) {
            return res
                .status(400)
                .json({ error: "This message has already been recalled" });
        }

        // Gán trường recalled = true để đánh dấu rằng tin nhắn đã được thu hồi
        message.recalled = true;
        await message.save();

        res.status(200).json({ message: "Message recalled successfully" });
    } catch (error) {
        console.log("Error in recallMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
