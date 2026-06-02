import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandler } from "./errors.js";
import { io } from "./utils/socket.js";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import userStatusRoutes from "./routes/userStatusRoutes.js";

const app = express();
const httpserver = createServer(app);

// Middleware
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(trackRoutes);
app.use(messageRoutes);
app.use(userRoutes);
app.use(userStatusRoutes);
app.use(communityRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Socket.IO
io.attach(httpserver);

// Database
mongoose.set("strictQuery", false);
mongoose.connect(env.MONGO_LOCAL_URL);

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Start server
httpserver.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT} (${env.NODE_ENV})`);
});

// For testing
export { app, httpserver };
