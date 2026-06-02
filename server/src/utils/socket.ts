import http from "http";
import { Server, Socket } from "socket.io";
import ClientMessage from "../Socket/ChatMessage.js";
import JoinRoom from "../Socket/JoinRoom.js";

const httpserver = http.createServer();

const io: InstanceType<typeof Server> = new Server(httpserver, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);
  ClientMessage(socket);
  JoinRoom(socket);

  // Typing indicators
  socket.on("typing", (data: { roomId: string; username: string }) => {
    socket.to(data.roomId).emit("typing", { username: data.username });
  });

  socket.on("stopTyping", (data: { roomId: string; username: string }) => {
    socket.to(data.roomId).emit("stopTyping", { username: data.username });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { io };
