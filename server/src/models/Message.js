import mongoose from "mongoose";
import moment from "moment";

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Message", messageSchema);
