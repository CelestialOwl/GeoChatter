import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";

const router = Router();

router.use(requireAuth);

router.get("/fetch-messages", async (req, res) => {
  Message.find({}, (err, users) => {
    res.send(users);
  });
});
router.post("/create-room", async (req, res) => {
  const { recepient } = req.body;
  const participents = [req.user, recepient];
  console.log(participents);
  const resp = await new ChatRoom({
    private: true,
    participents: participents,
  });
  res.status(200).send({ data: resp });
  console.log("chat room", resp);
});

export default router;
