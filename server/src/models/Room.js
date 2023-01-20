import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  email: String,
});
export default mongoose.model("Room", roomSchema);
