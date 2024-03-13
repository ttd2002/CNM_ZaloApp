import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    avatar: {
        type: String,
        default: "",
    },
});

const User = mongoose.model("User", userSchema);

export default User;
