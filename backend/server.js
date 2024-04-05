import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./database/connectToMongoDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadFileRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json()); //parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());//parse the incoming request with cookies

app.listen(PORT, () => {
    connectToMongoDB();//connect to MongoDB
    console.log(`Server is running on port ${PORT}`);
});

// app.get("/", (req, res) => {
//root route of the server http://localhost:8000
// });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/messages", messageRoutes);

