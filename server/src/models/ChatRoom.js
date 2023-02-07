import mongoose from "mongoose";

const participentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const chatRoomSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    require: true,
  },
  lastMessage: {
    type: String,
  },
  participents: [participentsSchema],
});

export default mongoose.model("ChatRoom", chatRoomSchema);
