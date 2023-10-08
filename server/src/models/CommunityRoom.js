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

const userSchema = new mongoose.Schema({
  is_mod: {
    type: Boolean,
    required: true,
  },
});

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
  },
  lastMessage: {
    type: String,
  },
  img: {
    type: String,
  },
  is_disbanded: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  users: [userSchema],
  messages: [messageSchema],
});

export default mongoose.model("Community", communitySchema);
