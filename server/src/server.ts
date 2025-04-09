import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./connect";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import channelRoutes from "./routes/channel.routes";
import { createServer } from 'http';
import { Server } from 'socket.io';
import {setupChatSocket} from "./socket/chat.socket";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const httpServer = createServer(app);

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://127.0.0.1:5173",
]
    // .filter(Boolean)
;

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin); // Autoriser l'origine si elle est valide
            } else {
                callback(new Error("CORS non autorisé"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);


// Setup Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin); // Autoriser l'origine si elle est valide
            } else {
                callback(new Error("CORS non autorisé"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    }
});

setupChatSocket(io);

app.use(express.json());
app.use(cookieParser());

// Import and use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);

connectDB()
    .then(() => {
        httpServer.listen(PORT, '127.0.0.1', () => {
            console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start server:", err);
    });
