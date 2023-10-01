import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { upload } from "../utils/multer.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import markLastSeen from "../middlewares/markLastSeen.js";
import Hobby from "../models/Hobby.js";
import { calculateDistance } from "../utils/geoLocation.js";

const router = Router();

router.post("/fetch-profile", markLastSeen, async (req, res) => {
  const response = await User.findOne({ email: req.body.email });
  res.status(200).send({ status: true, user: response });
  // User.find();
});

router.get("/users-list", markLastSeen, async (req, res) => {
  const response = await User.find({})
    .select({
      email: 1,
      username: 1,
      latitude: 1,
      longitude: 1,
      chats: 1,
      img: 1,
    })
    .exec();
  const filteredArray = response.filter(
    (a) => a._id.toString() !== req.user._id.toString()
  );
  const user = response.filter(
    (a) => a._id.toString() === req.user._id.toString()
  );
  const LoggedUser = user[0];
  console.log(user[0].latitude);
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i].latitude && filteredArray[i].longitude) {
      const distance = calculateDistance(
        parseInt(LoggedUser.latitude),
        parseInt(LoggedUser.longitude),
        parseInt(filteredArray[i].latitude),
        parseInt(filteredArray[i].longitude)
      );
      filteredArray[i].distance = distance;
    }
  }
  const distance = calculateDistance(
    parseInt(user[0].latitude),
    parseInt(user[0].longitude),
    parseInt(filteredArray[0].latitude),
    parseInt(filteredArray[0].longitude)
  );
  console.log("distance of user is", distance);
  res.status(200).send({ status: true, userList: filteredArray });
});

router.post("/save-hobby", markLastSeen, async (req, res) => {
  const fetchedUser = await User.findOne({ email: req.body.email });
  const hobbyIndex = fetchedUser.hobbies.findIndex(
    (data) => data.name === req.body.name
  );
  if (hobbyIndex >= 0) {
    fetchedUser.hobbies[hobbyIndex].selected = req.body.selected;
  } else {
  }
  User.findOneAndUpdate(
    { email: req.body.email },
    { hobbies: fetchedUser.hobbies },
    (err, data) => {
      res.status(200).send({ status: "ok" });
    }
  );
});

router.post("/fetch-hobbies", markLastSeen, async (req, res) => {
  const response = await User.findOne({ email: "new" });
  res.status(200).send({ status: true, hobbies: response.hobbies });
});

router.post("/edit-profile", upload.single("image"), async (req, res) => {
  console.log("user body", req.body);
  try {
    const path = req.file.path;
    const convertedPath = path.replace(/\\/g, "/");
    const response = await User.findOneAndUpdate(
      { email: req.body.email },
      { img: convertedPath }
    );
    res.status(200).send({ msg: "success" });
  } catch (err) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

export default router;
