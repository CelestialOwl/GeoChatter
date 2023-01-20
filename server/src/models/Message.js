import mongoose from "mongoose";
import moment from "moment";

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    require: true,
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
