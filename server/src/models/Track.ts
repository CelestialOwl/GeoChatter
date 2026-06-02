import mongoose from "mongoose";

type Document = mongoose.Document;
const Schema = mongoose.Schema;

export interface ITrack extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  locations: Array<{
    timestamp: number;
    coords: {
      latitude: number;
      longitude: number;
      altitude: number;
      accuracy: number;
      heading: number;
      speed: number;
    };
  }>;
}

const pointSchema = new Schema({
  timestamp: Number,
  coords: {
    latitude: { type: Number },
    longitude: { type: Number },
    altitude: { type: Number },
    accuracy: { type: Number },
    heading: { type: Number },
    speed: { type: Number },
  },
});

const trackSchema = new Schema<ITrack>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: "" },
  locations: [pointSchema],
});

export default mongoose.model<ITrack>("Track", trackSchema);
