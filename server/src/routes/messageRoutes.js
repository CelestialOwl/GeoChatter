import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const router = Router();

router.use(requireAuth);

router.post("/fetch-messages", async (req, res) => {
  const chatIdObj = mongoose.Types.ObjectId(req.body.roomId);
  ChatRoom.findOne({ _id: chatIdObj }, (err, users) => {
    if (users !== null) {
      res.send(users.messages);
      return;
    }
    res.send([]);
  });
});

router.post("/create-room", async (req, res) => {
  const requestUser = await Users.findOne({ _id: req.user._id });
  const targetUser = await Users.findOne({ _id: req.body.recipient._id });
  console.log("user", req.user._id, req.body.recipient._id);
  try {
    if (requestUser.chats.includes(req.body.recipient._id.toString())) {
      ChatRoom.findOne(
        {
          users: {
            $all: [req.body.recipient._id.toString(), req.user._id.toString()],
          },
        },
        (err, docs) => {
          console.log(err, docs);
          if (err) {
          } else {
            if (docs !== null) {
              res.status(200).send({
                status: true,
                message: "chat already exist!",
                chatId: docs._id.toString(),
                user: targetUser,
              });
            } else {
            }
          }
        }
      );
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
          $addToSet: {
            chats: req.body.recipient._id.toString(),
          },
        },
        (err, data) => {
          console.log("user1", err, data);
        }
      );
      Users.findOneAndUpdate(
        { _id: req.body.recipient._id },
        {
          $addToSet: {
            chats: req.user._id.toString(),
          },
        },
        (err, data) => {
          console.log("user2", err, data);
        }
      );
    }
  } catch (err) {
    res.status(200).send({ status: true, data: "new converstation started" });
  }
});

export default router;
