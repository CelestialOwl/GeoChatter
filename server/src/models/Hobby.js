import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hobby", hobbySchema);
