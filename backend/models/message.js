import mongoose from "mongoose";

/*
*   senderID: ID of the sender
*   receiverID: ID of the receiver
*   message: message content
*   image: image content
*   createdAt: time when the message is created
*   updatedAt: time when the message is updated
*
*/

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: [{
        type: String,
        required: true,
    }]
    //createAt, updateAt    
}, { timestamps: true });

const message = mongoose.model("Message", messageSchema);

export default message;