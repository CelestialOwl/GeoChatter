import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { upload } from "../utils/multer.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import markLastSeen from "../middlewares/markLastSeen.js";
import Hobby from "../models/Hobby.js";

const router = Router();

router.post("/fetch-profile", markLastSeen, async (req, res) => {
  const response = await User.findOne({ email: req.body.email });
  res.status(200).send({ status: true, user: response });
  // User.find();
});

router.get("/users-list", markLastSeen, async (req, res) => {
  const response = await User.find({});
  const filteredArray = response.filter(
    (a) => a._id.toString() !== req.user._id.toString()
  );
  console.log(filteredArray);
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
    console.log("something went wrong");
  }
  User.findOneAndUpdate(
    { email: req.body.email },
    { hobbies: fetchedUser.hobbies },
    (err, data) => {
      console.log(err, "something went wrong");
      res.status(200).send({ status: "ok" });
    }
  );
});

router.post("/fetch-hobbies", markLastSeen, async (req, res) => {
  const response = await User.findOne({ email: "new" });
  res.status(200).send({ status: true, hobbies: response.hobbies });
});

router.post("/edit-profile", upload.single("image"), async (req, res) => {
  var obj = {
    img: {
      data: fs.readFileSync(
        path.join(
          path.dirname(fileURLToPath(import.meta.url)) +
            "/uploads/" +
            "sarah.jpg"
        )
      ),
      contentType: "image/jpg",
    },
  };
  User.findOneAndUpdate({ email: "new" }, { img: obj }, (err) => {
    console.log("user error", err);
  });

  res.status(200).send({ msg: "success" });
});

export default router;
