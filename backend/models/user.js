import moment from "moment-timezone";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        length: 10,
    },
    password: {
        type: String,
        required: true,
        length: 8,
    },
    gender: {
        enum: ["male", "female"],
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: {
        currentTime: () => moment.tz("Asia/Ho_Chi_Minh").toDate()
    }
});

// Cập nhật phương thức toJSON để hiển thị thời gian theo múi giờ của Việt Nam
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        ret.createdAt = moment(ret.createdAt).tz("Asia/Ho_Chi_Minh").format();
        ret.updatedAt = moment(ret.updatedAt).tz("Asia/Ho_Chi_Minh").format();
        return ret;
    }
});

const User = mongoose.model("User", userSchema);

export default User;
