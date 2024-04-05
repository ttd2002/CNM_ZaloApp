import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import generateotp from "otp-generator";
import cloudinary from "../config/cloudinaryConfig.js";
// import sendOTP from "../controllers/sendOTPController.js";

export const signup = async (req, res) => {
    const { name, phone, password, confirmPassword, gender, birthday } = req.body;
    try {
        // Check if password and confirmPassword not match
        if (password !== confirmPassword || !confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }

        let user = await User.findOne({ phone }); //find the user with the phone number

        if (user) {
            //if user exists with the username
            return res.status(400).json({ error: `User already exists with this phone number` });
        }

        // hash password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let avatar = ''; // Khởi tạo biến avatar để lưu link ảnh

        // Set default avatar for user
        const boyAvatar = `https://avatar.iran.liara.run/public/boy?phone=${phone}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?phone=${phone}`;

        if (!req.file) {
            avatar = gender === "male" ? boyAvatar : girlAvatar; // Use default avatar based on gender if no file is uploaded
        } else {
            avatar = req.file.path;

        }

        // Create a new user
        const newUser = new User({
            name,
            phone,
            password: hashedPassword,
            gender,
            birthday,
            avatar,
        });

        // Generate JWT token
        const token = generateToken(newUser._id, res);

        // Save the user to the database
        const savedUser = await newUser.save();

        if (savedUser) {
            console.log("User created successfully");
        }

        res.status(201).json({
            //if the user is successfully created
            _id: newUser._id,
            name: newUser.name,
            phone: newUser.phone,
            gender: newUser.gender,
            birthday: newUser.birthday,
            avatar: newUser.avatar,
            token // Trả về token trong phản hồi
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" }); //if there is any error in the server (database error, server error, etc.)
    }
};


export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone }); //find the user with the phone number

        // if (phone != user.phone) {
        //     return res.status(400).json({ error: "Phone is not found" }); //if the user is not found or password is incorrect
        // }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        ); //compare the password with the hashed password

        if (!user || !isPasswordCorrect) {
            {
                return res.status(400).json({ error: "Invalid phone or password" }); //if the user is not found or password is incorrect
            }
        }

        const token = generateToken(user._id, res); //generate JWT token

        return res.status(200).json({
            //if the user is successfully logged in
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            gender: user.gender,
            birthday: user.birthday,
            avatar: user.avatar,
            token,

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
        const { phone } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await User.findOne({ phone });
        if (!exist) return res.status(404).send({ error: `Can't find User with phone number ${phone} !` });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

// generate OTP and send email
export async function generateOTP(req, res) {
    const { phone } = req.query; // get email from query params

    try {

        const user = await User.findOne({ phone });

        if (!user) {
            {
                return res.status(400).json({ error: "Invalid phone" }); //if the user is not found or password is incorrect
            }
        }

        // generate OTP
        const OTP = generateotp.generate(6, {
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
        });

        // send OTP to phone number
        // await sendOTP(phone, OTP);

        // set expiry time for OTP is 2 minutes
        const expiryTime = Date.now() + 120000;

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
    const { code, phone } = req.query;
    const OTP = req.app.locals.OTP;

    const user = await User.findOne({ phone });

    if (!user) {
        {
            return res.status(400).json({ error: "Invalid phone" }); //if the user is not found or password is incorrect
        }
    }

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

        const { phone, password } = req.body;

        try {
            User.findOne({ phone })
                .then((user) => {
                    bcrypt
                        .hash(password, 10)
                        .then((hashedPasssword) => {
                            User.updateOne(
                                { phone: user.phone },
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

