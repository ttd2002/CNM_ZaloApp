import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    //root route of the server http://localhost:8000
    res.send("Hello World");
});

app.use("/api/auth", authRoutes);