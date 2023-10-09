import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Community from "../models/CommunityRoom.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const router = Router();

router.use(requireAuth);

router.post("/create-community", requireAuth, async (req, res) => {
  const userAdmin = {
    _id: mongoose.Types.ObjectId(req.user._id),
    is_mod: true,
  };

  const communityRoom = await new Community({
    name: req.body.name,
    description: req.body.description,
    private: req.body.type,
    users: [userAdmin],
    is_disbanded: false,
  });
  await communityRoom.save();
  res.status(200).send({
    status: true,
    message: "community created",
  });
});

router.post("/get-community", requireAuth, async (req, res) => {
  // Find all records where "private" is false
  Community.find({ private: false, is_disbanded: false }, (err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send({ status: true, communities: records });
    return;
  });
});

router.post("/delete-community", requireAuth, async (req, res) => {
  Community.findOneAndUpdate(
    { _id: req.body.CommunityId },
    { is_disbanded: true },
    (err, res) => {
      console.log(err);
    }
  );
  res
    .status(200)
    .send({ status: true, message: "Community room is disbanded" });
});

router.post("/demote-user", requireAuth, async (req, res) => {
  Community.findOneAndUpdate(
    {
      _id: req.body.CommunityId,
      "users._id": req.body.userId,
    },
    {
      $set: { "users.$.is_mod": false },
    },
    { new: true }, // This option returns the updated document
    (err, updatedRoom) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!updatedRoom) {
        console.log("Room or user not found.");
        return;
      }
      console.log("Updated chat room:", updatedRoom);
    }
  );
  res.status(200).send({ status: true });
});

router.post("/promote-user", requireAuth, async (req, res) => {
  Community.findOneAndUpdate(
    {
      _id: req.body.CommunityId,
      "users._id": req.body.userId,
    },
    {
      $set: { "users.$.is_mod": true },
    },
    { new: true }, // This option returns the updated document
    (err, updatedRoom) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!updatedRoom) {
        console.log("Room or user not found.");
        return;
      }
      console.log("Updated chat room:", updatedRoom);
    }
  );
  res.status(200).send({ status: true });
});

router.post("/remove-user", async (req, res) => {
  Community.findOneAndUpdate(
    { _id: req.body.CommunityId },
    { $pull: { users: { _id: req.body.userId } } },
    { new: true },
    (err, updatedRoom) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!updatedRoom) {
        console.log("Room not found.");
        return;
      }
      console.log("Updated chat room:", updatedRoom);
    }
  );
  res.status(200).send({ status: true });
});

router.post("/add-user", requireAuth, async (req, res) => {
  Community.findOneAndUpdate(
    { _id: req.body.CommunityId },
    { $addToSet: { users: { _id: req.body.userId, is_mod: false } } },
    { new: true },
    (err, updatedRoom) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!updatedRoom) {
        console.log("Room not found.");
        return;
      }
      console.log("Updated chat room:", updatedRoom);
    }
  );
  res.status(200).send({ status: true });
});

export default router;
