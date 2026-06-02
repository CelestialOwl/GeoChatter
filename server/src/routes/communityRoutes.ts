import { Router, Request, Response } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Community from "../models/CommunityRoom.js";
import mongoose from "mongoose";
import { validate } from "../validators/validate.js";
import {
  createCommunitySchema,
  communityActionSchema,
  communityUserActionSchema,
} from "../validators/schemas.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/create-community",
  validate(createCommunitySchema),
  async (req: Request, res: Response) => {
    const userAdmin = {
      userId: new mongoose.Types.ObjectId(req.user!._id),
      is_mod: true,
    };

    const communityRoom = new Community({
      name: req.body.name,
      description: req.body.description,
      private: req.body.type,
      users: [userAdmin],
      is_disbanded: false,
    });

    await communityRoom.save();
    res.status(201).json({ status: true, message: "community created" });
  }
);

router.post("/get-community", async (req: Request, res: Response) => {
  try {
    const results = await Community.aggregate([
      { $match: { private: false, is_disbanded: false } },
      {
        $lookup: {
          from: "users",
          localField: "users.userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          private: 1,
          is_disbanded: 1,
          description: 1,
          users: 1,
          messages: 1,
          "userDetails.username": 1,
          "userDetails.email": 1,
          "userDetails.img": 1,
          "userDetails._id": 1,
        },
      },
    ]);

    // Attach user details to community users
    results.forEach((community) => {
      community.users.forEach((user: any) => {
        user.details = community.userDetails?.find(
          (u: any) => u._id.toString() === user.userId?.toString()
        ) || null;
      });
    });

    res.json({ status: true, communities: results });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch communities" });
  }
});

router.post(
  "/delete-community",
  validate(communityActionSchema),
  async (req: Request, res: Response) => {
    await Community.findOneAndUpdate(
      { _id: req.body.CommunityId },
      { is_disbanded: true }
    );
    res.json({ status: true, message: "Community room is disbanded" });
  }
);

router.post(
  "/promote-user",
  validate(communityUserActionSchema),
  async (req: Request, res: Response) => {
    const result = await Community.findOneAndUpdate(
      { _id: req.body.CommunityId, "users.userId": req.body.userId },
      { $set: { "users.$.is_mod": true } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ error: "Community or user not found" });
      return;
    }

    res.json({ status: true });
  }
);

router.post(
  "/demote-user",
  validate(communityUserActionSchema),
  async (req: Request, res: Response) => {
    const result = await Community.findOneAndUpdate(
      { _id: req.body.CommunityId, "users.userId": req.body.userId },
      { $set: { "users.$.is_mod": false } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ error: "Community or user not found" });
      return;
    }

    res.json({ status: true });
  }
);

router.post(
  "/remove-user",
  validate(communityUserActionSchema),
  async (req: Request, res: Response) => {
    const result = await Community.findOneAndUpdate(
      { _id: req.body.CommunityId },
      { $pull: { users: { userId: req.body.userId } } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ error: "Community not found" });
      return;
    }

    res.json({ status: true });
  }
);

router.post(
  "/add-user",
  validate(communityUserActionSchema),
  async (req: Request, res: Response) => {
    const result = await Community.findOneAndUpdate(
      { _id: req.body.CommunityId },
      { $addToSet: { users: { userId: req.body.userId, is_mod: false } } },
      { new: true }
    );

    if (!result) {
      res.status(404).json({ error: "Community not found" });
      return;
    }

    res.json({ status: true });
  }
);

export default router;
