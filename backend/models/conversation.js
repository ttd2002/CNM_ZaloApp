import moment from "moment-timezone";
import mongoose from "mongoose";

const consversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
    },
    {
        timestamps: {
            currentTime: () => moment.tz("Asia/Ho_Chi_Minh").toDate()
        }
    }
);

// Cập nhật phương thức toJSON để hiển thị thời gian theo múi giờ của Việt Nam
consversationSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        ret.createdAt = moment(ret.createdAt).tz("Asia/Ho_Chi_Minh").format();
        ret.updatedAt = moment(ret.updatedAt).tz("Asia/Ho_Chi_Minh").format();
        return ret;
    }
});

const conversation = mongoose.model("Conversation", consversationSchema);

export default conversation;
