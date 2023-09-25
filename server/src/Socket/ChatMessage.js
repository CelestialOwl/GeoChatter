import Users from "../models/Users.js";
import formatMessage from "../utils/messages.js";
import ChatRoom from "../models/ChatRoom.js";
import { io } from "../utils/socket.js";
import mongoose from "mongoose";
import { getCurrentUser } from "../utils/users.js";

//  Listen for chatMessage
export default function ClientMessage(socket) {
  socket.on("chatMessage", async (msg) => {
    console.log(msg);
    const chatId = mongoose.Types.ObjectId(msg.chatRoomId);
    const User_obj = await Users.findOne({ email: msg.email });
    const user = getCurrentUser(socket.id);
    if (true) {
      try {
        ChatRoom.findOneAndUpdate(
          { _id: chatId },
          {
            $push: {
              messages: formatMessage(
                User_obj.username,
                msg.field,
                User_obj._id
              ),
            },
          },
          (err, doc) => console.log(err, "err", doc, "csdfsd")
        );
      } catch (err) {
        console.log("Error with saving the message");
      }
      io.emit(
        "message",
        formatMessage(User_obj.username, msg.field, User_obj._id)
      );
    }
    // io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
}
