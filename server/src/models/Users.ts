import mongoose from "mongoose";
import bcrypt from "bcrypt";

type Document = mongoose.Document;
type Model<T> = mongoose.Model<T>;
const Schema = mongoose.Schema;

// Sub-schemas
const locationSchema = new Schema({
  timeStamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const hobbySchema = new Schema({
  name: { type: String },
  selected: { type: Boolean },
});

// Interfaces
export interface ILocation {
  timeStamp?: number;
  coords?: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    accuracy?: number;
    heading?: number;
    speed?: number;
  };
}

export interface IHobby {
  name?: string;
  selected?: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  username?: string;
  img?: string;
  lastonline?: string;
  phone?: string;
  longitude?: string;
  latitude?: string;
  distance?: string;
  private?: boolean;
  super_admin?: boolean;
  location?: ILocation;
  hobbies: IHobby[];
  chats: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  img: { type: String },
  password: { type: String, required: true },
  username: { type: String },
  lastonline: { type: String },
  phone: { type: String },
  longitude: { type: String },
  latitude: { type: String },
  distance: { type: String },
  private: { type: Boolean },
  super_admin: { type: Boolean },
  location: locationSchema,
  hobbies: [hobbySchema],
  chats: [String],
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      if (!isMatch) return reject(new Error("Password does not match"));
      resolve(true);
    });
  });
};

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
