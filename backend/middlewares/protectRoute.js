import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provvided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token!" });
        }

        const user = await User.findById(decoded.userId).select("password");//find the user by id

        if (!user) {
            return res.status(401).json({ error: "Unauthorized - User not found!" });
        }

        req.user = user;

        next();//if everything is fine then call the next middleware
    } catch (error) {
        console.log("Error in protected Route", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}
export default protectRoute;