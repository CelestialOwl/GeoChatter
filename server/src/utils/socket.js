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
    origin: "https://server-1xg2.onrender.com",
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
