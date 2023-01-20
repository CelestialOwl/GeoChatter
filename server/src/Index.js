import express from "express";
import authRoutes from "./routes/authRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import bodyParser from "body-parser";
import requireAuth from "../src/middlewares/requireAuth.js";
import { createServer } from "http";
import { Server } from "socket.io";
import formatMessage from "./utils/messages.js";
import {
  getRoomUsers,
  getCurrentUser,
  userJoin,
  userLeave,
} from "./utils/users.js";
import mongoose from "mongoose";
import Message from "./models/Message.js";

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
  console.log("A user connected");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast.emit(
      "message",
      formatMessage(botName, `${user.username} has joined the chat`)
    );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", async (msg) => {
    try {
      Message.insertMany([formatMessage(msg)], (err) => console.log(err));
    } catch (err) {
      console.log("Error with saving the message");
    }
    console.log(msg);
    const user = getCurrentUser(socket.id);

    socket.broadcast.emit("message", formatMessage(user.username, msg));

    // io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

mongoose.set("strictQuery", false);
const mongoUri =
  "mongodb+srv://Hassan:Dontfeelblue23@cluster0.ojoja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then((data) => console.log("connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("connected to mongoose instance");
  // createInstance();
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting ", err);
});

httpserver.listen(process.env.PORT || 3002, () => {
  console.log("listening on port 3002");
});
