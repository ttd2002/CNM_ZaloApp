import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, username, email, password, confirmPassword, gender } = req.body;
    try {

        // Check if password and confirmPassword not match
        if (password !== confirmPassword || !confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }

        let user = await User.findOne({ username }); //find the user with the username

        if (user) {
            //if user exists with the username
            return res
                .status(400)
                .json({ error: `User already exists with this username` });
        }

        user = await User.findOne({ email }); //find the user with the email

        if (user) {
            //if user exists with the email
            return res
                .status(400)
                .json({ error: `User already exists with this email` });
        }

        // hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //set avatar default for user
        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // create a new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            avatar: gender === "male" ? boyAvatar : girlAvatar,
        });

        //save the user to the database
        await newUser.save();

        res.status(201).json({//if the user is successfully created
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });//if there is any error in the server (database error, server error, etc.)
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });//find the user with the email

    } catch (error) {
        console.log("Error in login controller", error.message);//if there is any error in the server (database error, server error, etc.)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    res.send("Logout Route");
};
