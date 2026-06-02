import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface IHobby extends Document {
  name?: string;
  selected?: boolean;
}

const hobbySchema = new Schema<IHobby>({
  name: { type: String },
  selected: { type: Boolean, default: false },
});

export default mongoose.model<IHobby>("Hobby", hobbySchema);
