import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface IMessage extends Document {
  text: string;
  username?: string;
  time: string;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  username: { type: String },
  time: { type: String, required: true },
});

export default mongoose.model<IMessage>("Message", messageSchema);
