import express from "express";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import bodyParser from "body-parser";
import requireAuth from "../src/middlewares/requireAuth.js";
import messageRoutes from "./routes/messageRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import formatMessage from "./utils/messages.js";
import Users from "./models/Users.js";
import userRoutes from "./routes/userRoutes.js";
import Hobby from "./models/Hobby.js";
import markLastSeen from "./middlewares/markLastSeen.js";
import {
  getRoomUsers,
  getCurrentUser,
  userJoin,
  userLeave,
} from "./utils/users.js";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const httpserver = createServer(app);
export const io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let botName = "twitch";

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", async ({ username, room, email }) => {
    const myUser = await Users.findOne({ email: email });
    const user = userJoin(socket.id, username, room, myUser._id || "default");

    socket.join(user.room);

    // Welcome current user
    // socket.emit(
    //   "message",
    //   formatMessage(botName, "Welcome to ChatCord!", myUser._id)
    // );

    // // Broadcast when a user connects
    // socket.broadcast.emit(
    //   "message",
    //   formatMessage(
    //     botName,
    //     `${user.username || "kappa"} has joined the chat`,
    //     myUser._id
    //   )
    // );

    // // Send users and room info
    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getRoomUsers(user.room),
    // });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    console.log(msg);
    const user = getCurrentUser(socket.id);
    if (user) {
      try {
        Message.insertMany(
          [formatMessage(user.username, msg, user.userId)],
          (err) => {
            if (err === null) {
              console.log("record inserted");
            }
          }
        );
      } catch (err) {
        console.log("Error with saving the message");
      }
    }

    io.emit("message", formatMessage(user.username, msg, user.userId));

    // io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  // socket.on("disconnect", () => {
  //   const user = userLeave(socket.id);

  //   if (user) {
  //     io.to(user.room).emit(
  //       "message",
  //       formatMessage(botName, `${user.username} has left the chat`)
  //     );

  //     // Send users and room info
  //     io.to(user.room).emit("roomUsers", {
  //       room: user.room,
  //       users: getRoomUsers(user.room),
  //     });
  //   }
  // });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(messageRoutes);
app.use(userRoutes);

// const arr = [
//   { name: "Cricket" },
//   { name: "Football" },
//   { name: "Tennis" },
//   { name: "Relationship" },
//   { name: "Esports" },
// ];

// Hobby.insertMany(arr, (err, docs) => {
//   console.log("errors", err);
//   console.log("docs", docs);
// });

app.get("/", requireAuth, markLastSeen, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

mongoose.set("strictQuery", false);
const mongoUri = process.env.MONGO_LOCAL_URL;
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("connected to mongoose instance");
  // createInstance();
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting ", err);
});

httpserver.listen(process.env.PORT || 3002, () => {
  // console.log("listening on port 3002");
});
