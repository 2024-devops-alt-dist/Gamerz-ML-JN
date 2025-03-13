import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./connect";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

// Import and use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start server:", err);
    });
