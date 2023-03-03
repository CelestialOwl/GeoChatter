import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const router = Router();

router.use(requireAuth);

router.post("/fetch-messages", async (req, res) => {
  console.log("users", req.body);
  const roomId = mongoose.Types.ObjectId(req.body.roomId);
  ChatRoom.findOne({ _id: roomId }, (err, chat) => {
    console.log(chat);
    res.send(chat.messages);
  });
});
router.post("/create-room", async (req, res) => {
  const recUser = await Users.findOne({ _id: req.user._id });
  if (recUser !== undefined) {
    if (recUser.chats.includes(req.body.recipient._id.toString())) {
      const chatRoomData = await ChatRoom.findOne({
        recepientId: req.body.recipient._id,
      });
      // console.log("user back results", myresult);
      res.status(200).send({
        data: "chat already exist!",
        roomId: chatRoomData._id,
        status: true,
      });
      return;
    } else {
      const users = [
        req.user._id.toString(),
        req.body.recipient._id.toString(),
      ];
      const resp = await new ChatRoom({
        private: true,
        users,
        recepientId: req.body.recipient._id,
      });
      await resp.save();
      console.log("new chat rooom", resp);
      Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            chats: req.body.recipient._id.toString(),
          },
        },
        (err, data) => {
          res.status(200).send({
            status: true,
            data: "new converstation started",
            roomId: resp._id,
          });
        }
      );
    }
  }
});

export default router;
