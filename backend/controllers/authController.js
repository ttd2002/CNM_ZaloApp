import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import generateotp from "otp-generator";
import { sendOTPByEmail } from "./mailer.js";

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

            res.status(201).json({
                //if the user is successfully created
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" }); //if the user is not created
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" }); //if there is any error in the server (database error, server error, etc.)
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); //find the user with the username
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        ); //compare the password with the hashed password

        if (!user || !isPasswordCorrect) {
            {
                return res.status(400).json({ error: "Invalid username or password" }); //if the user is not found or password is incorrect
            }
        }

        generateToken(user._id, res); //generate JWT token

        return res.status(200).json({
            //if the user is successfully logged in
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.log("Error in login controller", error.message); //if there is any error in the server (database error, server error, etc.)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); //clear the cookie
        res.status(200).json({ message: "User logged out successfully" }); //if the user is successfully logged out
    } catch (error) {
        console.log("Error in logout controller", error.message); //if there is any error in the server (database error, server error, etc.)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/** middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await User.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

// generate OTP and send email
export async function generateOTP(req, res) {
    const { email, username } = req.query; // get email from query params

    try {
        // generate OTP
        const OTP = generateotp.generate(6, {
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
        });

        // send OTP to email
        await sendOTPByEmail(email, username, OTP);

        // set expiry time for OTP is 1 minutes
        const expiryTime = Date.now() + 60000;

        // store OTP in local variable
        req.app.locals.OTP = { code: OTP, expiryTime };

        // return OTP generated
        res.status(201).send({ code: OTP });
    } catch (error) {
        console.log("Error generating OTP:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// verify OTP
export async function verifyOTP(req, res) {
    const { code } = req.query;
    const OTP = req.app.locals.OTP;

    if (OTP && parseInt(OTP.code) === parseInt(code) && Date.now() <= OTP.expiryTime) {
        // Reset OTP value and set reset session flag
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ message: "OTP Verified Successfully!" });
    }

    return res.status(400).send({ error: "Invalid OTP or OTP expired!" });

}

//create Reset session
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false; //allow acess to this route only once
        return res.status(201).send({ message: "Access granted!" });
    }
    return res
        .status(440)
        .send({ error: "Session expired!" });
}

//reset password
export async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession)
            return res
                .status(440)
                .send({ error: "Session expired!" });

        const { username, password } = req.body;

        try {
            User.findOne({ username })
                .then((user) => {
                    bcrypt
                        .hash(password, 10)
                        .then((hashedPasssword) => {
                            User.updateOne(
                                { username: user.username },
                                { password: hashedPasssword }
                            )
                                .then(data => {
                                    return res
                                        .status(201)
                                        .send({ message: "Password reset successfully!" });
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res
                                        .status(500)
                                        .send({ message: "Error updating password" });
                                });
                        })
                        .catch((e) => {
                            return res
                                .status(500)
                                .send({ message: "Error hashing password" });
                        });
                })
                .catch(err => {
                    console.log(err);
                    return res
                        .status(500)
                        .send({ message: "Error finding user" });
                });
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}
