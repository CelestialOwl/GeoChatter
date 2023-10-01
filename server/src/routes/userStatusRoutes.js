import { Router } from "express";
import User from "../models/Users.js";
import Status from "../models/Status.js";
import { upload } from "../utils/multer.js";

const router = Router();

router.post("/create-status", upload.single("image"), async (req, res) => {
  try {
    const path = req.file.path;
    const convertedPath = path.replace(/\\/g, "/");
    const status = new Status({
      image: convertedPath,
      time: new Date(),
      userId: req.user._id,
    });
    await status.save();
    console.log(status);
    res.status(200).send({ status: "ok" });
  } catch (err) {
    res.status(400).send({ status: err });
  }
});

router.post("/fetch-user-status", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Calculate the time 24 hours ago

  Status.find({
    $and: [
      { userId: userId }, // Match the specific userID
      { time: { $gte: twentyFourHoursAgo } }, // Match records with "time" greater than or equal to 24 hours ago
    ],
  })
    .then((results) => {
      console.log(results);
      res.status(200).send({ status: true, status: results });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ status: "something went wrong" });
    });
});

export default router;
