import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  time: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Status", StatusSchema);
