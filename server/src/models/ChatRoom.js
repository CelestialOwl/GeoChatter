import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  username: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
});
const usersSchema = new mongoose.Schema({
  id: String,
});

const chatRoomSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    require: true,
  },
  lastMessage: {
    type: String,
  },
  users: [String],
  messages: [messageSchema],
});

export default mongoose.model("ChatRoom", chatRoomSchema);
