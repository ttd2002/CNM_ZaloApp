import jwt from "jsonwebtoken";

const generateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "30d",//expires in 30 days
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })
};

export default generateToken;