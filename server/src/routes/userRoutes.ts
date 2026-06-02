import { Router, Request, Response } from "express";
import User from "../models/Users.js";
import { upload } from "../utils/multer.js";
import markLastSeen from "../middlewares/markLastSeen.js";
import Hobby from "../models/Hobby.js";
import { calculateDistance } from "../utils/geoLocation.js";
import { validate } from "../validators/validate.js";
import { fetchProfileSchema, saveHobbySchema } from "../validators/schemas.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/fetch-profile",
  markLastSeen,
  validate(fetchProfileSchema),
  async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email }).select({
      email: 1,
      username: 1,
      latitude: 1,
      longitude: 1,
      chats: 1,
      img: 1,
      hobbies: 1,
      super_admin: 1,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ status: true, user });
  }
);

router.get("/users-list", markLastSeen, async (req: Request, res: Response) => {
  const allUsers = await User.find({ super_admin: { $exists: false } })
    .select({
      email: 1,
      username: 1,
      latitude: 1,
      longitude: 1,
      chats: 1,
      img: 1,
      super_admin: 1,
    })
    .exec();

  const filteredArray = allUsers.filter(
    (a) => a._id.toString() !== req.user!._id.toString()
  );

  const loggedUser = allUsers.find(
    (a) => a._id.toString() === req.user!._id.toString()
  );

  if (!loggedUser || !loggedUser.latitude || !loggedUser.longitude) {
    res.json({ status: true, userList: filteredArray });
    return;
  }

  const usersWithDistance = filteredArray.map((user) => {
    const userObj = user.toObject();
    if (user.latitude && user.longitude) {
      (userObj as any).distance = calculateDistance(
        parseFloat(loggedUser.latitude!),
        parseFloat(loggedUser.longitude!),
        parseFloat(user.latitude!),
        parseFloat(user.longitude!)
      );
    }
    return userObj;
  });

  res.json({ status: true, userList: usersWithDistance });
});

router.post(
  "/save-hobby",
  markLastSeen,
  validate(saveHobbySchema),
  async (req: Request, res: Response) => {
    const { email, name, selected } = req.body;

    const result = await User.findOneAndUpdate(
      { email, "hobbies.name": name },
      { $set: { "hobbies.$.selected": selected } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ error: "User or hobby not found" });
      return;
    }

    res.json({ status: "ok" });
  }
);

router.post("/fetch-hobbies", markLastSeen, async (_req: Request, res: Response) => {
  const hobbies = await Hobby.find({});
  res.json({ status: true, hobbies });
});

router.post(
  "/edit-profile",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No image provided" });
        return;
      }

      const filePath = req.file.path.replace(/\\/g, "/");
      await User.findOneAndUpdate(
        { email: req.body.email },
        { img: filePath }
      );

      res.json({ msg: "success" });
    } catch {
      res.status(400).json({ msg: "something went wrong" });
    }
  }
);

export default router;
