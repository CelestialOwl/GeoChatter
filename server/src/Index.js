import express from "express";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import bodyParser from "body-parser";
import requireAuth from "../src/middlewares/requireAuth.js";
import messageRoutes from "./routes/messageRoutes.js";
import { createServer } from "http";
import userRoutes from "./routes/userRoutes.js";
import markLastSeen from "./middlewares/markLastSeen.js";
import mongoose from "mongoose";
import { io } from "./utils/socket.js";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const mongoUri = process.env.MONGO_LOCAL_URL;
const app = express();
const httpserver = createServer(app);

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(messageRoutes);
app.use(userRoutes);
io.attach(httpserver);

app.get("/", requireAuth, markLastSeen, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

mongoose.set("strictQuery", false);
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting ", err);
});

httpserver.listen(process.env.PORT || 3003, () => {
  // console.log("listening on port 3002");
});
