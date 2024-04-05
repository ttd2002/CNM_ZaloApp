import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        // console.log("Sender ID: ", senderId);
        // console.log("Receiver ID: ", receiverId);

        if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Sender ID and Receiver ID are required" });
        }

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
            messages: [{
                content,
                image: imageUrls,
            }],
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};