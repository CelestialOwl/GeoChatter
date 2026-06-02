import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface IMessage {
  text: string;
  username?: string;
  time: string;
}

export interface IChatRoom extends Document {
  private: boolean;
  lastMessage?: string;
  users: string[];
  messages: IMessage[];
  recepientId?: mongoose.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  username: { type: String },
  time: { type: String, required: true },
});

const chatRoomSchema = new Schema<IChatRoom>({
  private: { type: Boolean, required: true },
  lastMessage: { type: String },
  users: [String],
  messages: [messageSchema],
  recepientId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);
