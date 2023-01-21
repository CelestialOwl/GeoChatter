import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";

const router = Router();

router.use(requireAuth);

router.get("/fetch-messages", async (req, res) => {
  Message.find({}, (err, users) => {
    res.send(users);
  });
});

export default router;
