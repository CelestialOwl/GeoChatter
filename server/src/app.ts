import express from "express";
import cors from "cors";
import { errorHandler } from "./errors.js";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import userStatusRoutes from "./routes/userStatusRoutes.js";

/**
 * Creates an Express app instance without starting the server.
 * Used for testing with supertest.
 */
export function createApp() {
  const app = express();

  app.use(cors());
  app.use("/uploads", express.static("uploads"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(authRoutes);
  app.use(trackRoutes);
  app.use(messageRoutes);
  app.use(userRoutes);
  app.use(userStatusRoutes);
  app.use(communityRoutes);

  app.use(errorHandler);

  return app;
}
