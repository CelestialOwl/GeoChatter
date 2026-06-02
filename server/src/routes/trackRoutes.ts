import { Router, Request, Response } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Track from "../models/Track.js";
import User from "../models/Users.js";
import { validate } from "../validators/validate.js";
import { saveLocationSchema } from "../validators/schemas.js";

const router = Router();

router.use(requireAuth);

router.get("/tracks", async (req: Request, res: Response) => {
  const tracks = await Track.find({ userId: req.user!._id });
  res.json(tracks);
});

router.post(
  "/save-location",
  validate(saveLocationSchema),
  async (req: Request, res: Response) => {
    const { latitude, longitude, email } = req.body;

    try {
      await User.findOneAndUpdate(
        { email },
        { latitude: latitude.toString(), longitude: longitude.toString() }
      );
      res.json({ status: true, message: "location saved" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save location" });
    }
  }
);

export default router;
