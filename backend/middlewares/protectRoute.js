import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
    // try {
    //     const token = req.cookies.jwt;
    //     // console.log("Token: ", token);

    //     if (!token) {
    //         return res.status(401).json({ error: "Unauthorized - No Token Provided!" });
    //     }
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token
    //     // console.log("Decoded: ", decoded);

    //     if (!decoded) {
    //         return res.status(401).json({ error: "Unauthorized - Invalid Token!" });
    //     }

    //     const user = await User.findById(decoded.userID).select("-password");//find the user by id
    //     // console.log("User: ", user);

    //     if (!user) {
    //         return res.status(401).json({ error: "Unauthorized - User not found!" });
    //     }

    //     req.user = user;

    //     next();//if everything is fine then call the next middleware
    // } catch (error) {
    //     console.log("Error in protected Route", error.message);
    //     return res.status(500).json({ error: "Internal server error" });
    // }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // console.log('Token:', token);
    // console.log('AuthHeader:', authHeader);

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userID).select("-password -friendRequests -friends");

        if (!req.user) {
            return res.status(401).json({ error: 'Access denied. Invalid token.' });
        }

        next();
    } catch (error) {
        console.error('Error authenticating token:', error.message);
        return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }
}
export default protectRoute;