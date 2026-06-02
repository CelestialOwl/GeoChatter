import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface IStatus extends Document {
  image?: string;
  time?: string;
  userId: mongoose.Types.ObjectId;
}

const statusSchema = new Schema<IStatus>({
  image: { type: String },
  time: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<IStatus>("Status", statusSchema);
