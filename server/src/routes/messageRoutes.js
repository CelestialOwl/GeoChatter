import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const router = Router();

router.use(requireAuth);

router.post("/fetch-messages", async (req, res) => {
  const chatIdObj = mongoose.Types.ObjectId(req.body.chatID);
  ChatRoom.findOne({ _id: chatIdObj }, (err, users) => {
    console.log(users);
    res.send(users.messages);
  });
});
router.post("/create-room", async (req, res) => {
  const recUser = await Users.findOne({ _id: req.user._id });

  if (recUser !== undefined) {
    try {
      if (recUser.chats.includes(req.body.recipient._id.toString())) {
        ChatRoom.findOne(
          {
            users: {
              $all: [
                req.body.recipient._id.toString(),
                req.user._id.toString(),
              ],
            },
          },
          (err, docs) => {
            if (err) {
              console.log("Error", err);
            } else {
              res.status(200).send({
                status: true,
                message: "chat already exist!",
                chatId: docs._id.toString(),
              });
            }
          }
        );
        // console.log("user back results", myresult);
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
    } catch (err) {
      console.log("something is wrong", err);
    }
    res.status(200).send({ status: true, data: "new converstation started" });
  }
});

export default router;
