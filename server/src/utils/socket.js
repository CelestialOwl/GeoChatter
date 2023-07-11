import express from "express";
import http from "http";
import { Server } from "socket.io";
import ClientMessage from "../Socket/ChatMessage.js";
import JoinRoom from "../Socket/JoinRoom.js";

// import axios from "axios";
// import Users from "../../models/Users.js";

const app = express();

const httpserver = http.createServer(app);
let io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let Socket = {
  emit: function (event, data) {
    io.emit(event, data);
  },
};
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  ClientMessage(socket);
  JoinRoom(socket);
});

export { Socket, io };

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

// Message.insertMany(
//   [formatMessage(user.username, msg, user.userId)],
//   (err) => {
//     if (err === null) {
//       console.log("record inserted");
//     }
//   }
// );
// .insertMany(
//   [formatMessage(user.username, msg.field, user.userId)],
//   (err) => {
//     if (err === null) {
//       console.log("record inserted");
//     }
//   }
// );
