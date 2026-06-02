import { Socket } from "socket.io";
import User from "../models/Users.js";
import formatMessage from "../utils/messages.js";
import ChatRoom from "../models/ChatRoom.js";
import { io } from "../utils/socket.js";
import mongoose from "mongoose";

export default function ClientMessage(socket: Socket): void {
  socket.on("chatMessage", async (msg: { field: string; chatRoomId: string; email: string }) => {
    if (!msg.field || !msg.chatRoomId || !msg.email) return;

    try {
      const chatId = new mongoose.Types.ObjectId(msg.chatRoomId);
      const user = await User.findOne({ email: msg.email });

      if (!user) return;

      const message = formatMessage(user.username || "Anonymous", msg.field, user._id.toString());

      await ChatRoom.findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: message } }
      );

      // Emit to the specific room instead of broadcasting to everyone
      io.to(msg.chatRoomId).emit("message", message);
    } catch (err) {
      console.error("Error handling chat message:", err);
    }
  });
}
