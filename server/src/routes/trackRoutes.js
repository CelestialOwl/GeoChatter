import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Track from "../models/Track.js";
import Users from "../models/Users.js";

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/save-location", async (req, res) => {
  const { latitude, longitude, email } = req.body;

  if (!latitude || !longitude) {
    return res.status(422).send({ error: "You must provide a location" });
  }
  try {
    let doc = await Users.findOneAndUpdate(
      { email: email },
      { latitude: latitude, longitude: longitude }
    );
    res.status(200).send({ status: true, message: "location saved" });

    // res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

export default router;
