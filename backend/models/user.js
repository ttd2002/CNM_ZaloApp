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
        type: String,
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
}, { timestamps: true });

// Trước khi lưu vào cơ sở dữ liệu, chuyển đổi ngày sinh sang định dạng dd/MM/yy
userSchema.pre("save", function (next) {
    const user = this;
    const birthday = user.birthday;
    if (birthday instanceof Date) {
        const formattedBirthday = `${birthday.getDate()}/${birthday.getMonth() + 1}/${birthday.getFullYear()}`;
        user.birthday = formattedBirthday;
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
