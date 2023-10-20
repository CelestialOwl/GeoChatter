import mongoose from "mongoose";
import bcrypt from "bcrypt";

const locationSchema = new mongoose.Schema({
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
const hobbySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
});
const chat = new mongoose.Schema({
  chatMessage: {
    chatId: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  img: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  lastonline: {
    type: String,
  },
  phone: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  distance: {
    type: String,
  },
  private: {
    type: Boolean,
  },
  super_admin: {
    type: Boolean,
  },
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
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

export default mongoose.model("User", userSchema);
