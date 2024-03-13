import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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
        if (newUser) {

            //generate JWT token
            generateToken(newUser._id, res);

            //save the user to the database
            await newUser.save();

            res.status(201).json({//if the user is successfully created
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });//if the user is not created
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });//if there is any error in the server (database error, server error, etc.)
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });//find the user with the username
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");//compare the password with the hashed password

        if (!user || !isPasswordCorrect) {
            {
                return res.status(400).json({ error: "Invalid username or password" });//if the user is not found or password is incorrect
            }
        }

        generateToken(user._id, res);//generate JWT token

        return res.status(200).json({//if the user is successfully logged in
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);//if there is any error in the server (database error, server error, etc.)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });//clear the cookie
        res.status(200).json({ message: "User logged out successfully" });//if the user is successfully logged out
    } catch (error) {
        console.log("Error in logout controller", error.message);//if there is any error in the server (database error, server error, etc.)
        res.status(500).json({ error: "Internal Server Error" });
    }
};
