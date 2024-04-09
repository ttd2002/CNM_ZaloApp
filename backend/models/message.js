import moment from "moment-timezone";
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
    messages: [{
        content: {
            type: String,
            required: function () {
                return this.image === undefined;
            }
        },
        image: [{
            type: String,
            required: function () {
                return this.content === undefined;
            }
        }],
        createdAt: {
            type: Date,
            default: () => moment.tz("Asia/Ho_Chi_Minh").toDate(),
        }
    }],
    deletedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    recalled: {
        type: Boolean,
        default: false
    }
    //createAt, updateAt    
}, {
    timestamps: {
        currentTime: () => moment.tz("Asia/Ho_Chi_Minh").toDate()
    }
});

// Cập nhật phương thức toJSON để hiển thị thời gian theo múi giờ của Việt Nam
messageSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        ret.createdAt = moment(ret.createdAt).tz("Asia/Ho_Chi_Minh").format();
        ret.updatedAt = moment(ret.updatedAt).tz("Asia/Ho_Chi_Minh").format();
        ret.messages.forEach(message => {
            message.createdAt = moment(message.createdAt).tz("Asia/Ho_Chi_Minh").format();
        });
        return ret;
    }
});

const message = mongoose.model("Message", messageSchema);

export default message;