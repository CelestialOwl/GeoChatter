import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Users from "../models/Users.js";

const router = Router();

router.use(requireAuth);

router.get("/fetch-messages", async (req, res) => {
  Message.find({}, (err, users) => {
    res.send(users);
  });
});
router.post("/create-room", async (req, res) => {
  const recUser = await Users.findOne({ _id: req.body.recipient._id });
  console.log(recUser);

  const participents = [req.user._id, recUser._id];
  console.log("users rooms", participents);
  const resp = await new ChatRoom({
    private: true,
    participents: participents,
  });
  await resp.save();
  res.status(200).send({ data: resp });
  console.log("chat room", resp);
});

export default router;
