import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const router = Router();

router.use(requireAuth);

router.get("/fetch-messages", async (req, res) => {
  Message.find({}, (err, users) => {
    res.send(users);
  });
});
router.post("/create-room", async (req, res) => {
  const recUser = await Users.findOne({ _id: req.user._id });
  if (recUser !== undefined) {
    if (recUser.chats.includes(req.body.recipient._id.toString())) {
      // console.log("user back results", myresult);
      res.status(200).send({ data: "chat already exist!" });
      return;
    } else {
      const users = [
        req.user._id.toString(),
        req.body.recipient._id.toString(),
      ];
      const resp = await new ChatRoom({
        private: true,
        users,
      });
      await resp.save();
      Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            chats: req.body.recipient._id.toString(),
          },
        },
        (err, data) => {}
      );
    }
    res.status(200).send({ status: true, data: "new converstation started" });
  }
});

export default router;
