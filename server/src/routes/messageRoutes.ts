import { Router, Request, Response } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import ChatRoom from "../models/ChatRoom.js";
import User from "../models/Users.js";
import mongoose from "mongoose";
import { validate } from "../validators/validate.js";
import { createRoomSchema, fetchMessagesSchema } from "../validators/schemas.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/fetch-messages",
  validate(fetchMessagesSchema),
  async (req: Request, res: Response) => {
    try {
      const chatId = new mongoose.Types.ObjectId(req.body.roomId);
      const page = Math.max(1, parseInt(req.body.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.body.limit) || 50));

      const room = await ChatRoom.findOne({ _id: chatId });

      if (!room) {
        res.json({ messages: [], total: 0, page, hasMore: false });
        return;
      }

      const total = room.messages.length;
      const start = Math.max(0, total - page * limit);
      const end = total - (page - 1) * limit;
      const messages = room.messages.slice(start, end);

      res.json({
        messages,
        total,
        page,
        hasMore: start > 0,
      });
    } catch {
      res.status(400).json({ error: "Invalid room ID" });
    }
  }
);

router.post(
  "/create-room",
  validate(createRoomSchema),
  async (req: Request, res: Response) => {
    const recipientId = req.body.recipient._id;
    const currentUserId = req.user!._id.toString();

    try {
      const targetUser = await User.findOne({ _id: recipientId });
      if (!targetUser) {
        res.status(404).json({ error: "Recipient not found" });
        return;
      }

      // Check if chat already exists
      const existingRoom = await ChatRoom.findOne({
        users: { $all: [recipientId, currentUserId] },
      });

      if (existingRoom) {
        res.json({
          status: true,
          message: "chat already exist!",
          chatId: existingRoom._id.toString(),
          user: targetUser,
        });
        return;
      }

      // Create new room
      const newRoom = new ChatRoom({
        private: true,
        users: [currentUserId, recipientId],
      });
      await newRoom.save();

      // Update both users' chat lists
      await User.findOneAndUpdate(
        { _id: currentUserId },
        { $addToSet: { chats: recipientId } }
      );
      await User.findOneAndUpdate(
        { _id: recipientId },
        { $addToSet: { chats: currentUserId } }
      );

      res.status(201).json({
        status: true,
        message: "new conversation started",
        chatId: newRoom._id.toString(),
        user: targetUser,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to create room" });
    }
  }
);

export default router;
