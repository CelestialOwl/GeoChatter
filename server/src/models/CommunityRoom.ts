import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface ICommunityUser {
  is_mod: boolean;
  userId: mongoose.Types.ObjectId;
}

export interface ICommunityMessage {
  text: string;
  username?: string;
  time: string;
}

export interface ICommunity extends Document {
  name: string;
  private?: boolean;
  lastMessage?: string;
  img?: string;
  is_disbanded?: boolean;
  description?: string;
  users: ICommunityUser[];
  messages: ICommunityMessage[];
}

const messageSchema = new Schema<ICommunityMessage>({
  text: { type: String, required: true },
  username: { type: String },
  time: { type: String, required: true },
});

const userSchema = new Schema<ICommunityUser>({
  is_mod: { type: Boolean, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const communitySchema = new Schema<ICommunity>({
  name: { type: String, required: true },
  private: { type: Boolean },
  lastMessage: { type: String },
  img: { type: String },
  is_disbanded: { type: Boolean },
  description: { type: String },
  users: [userSchema],
  messages: [messageSchema],
});

export default mongoose.model<ICommunity>("Community", communitySchema);
