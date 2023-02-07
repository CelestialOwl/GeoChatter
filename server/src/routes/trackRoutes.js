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
  const { location, email } = req.body;
  res.status(200).send({ ok: "ok" });

  if (!location) {
    return res.status(422).send({ error: "You must provide a location" });
  }
  try {
    let doc = await Users.findOneAndUpdate(
      { email: email },
      { location: location },
      { new: true }
    );
    // res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

export default router;
