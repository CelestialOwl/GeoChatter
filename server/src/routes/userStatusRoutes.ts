import { Router, Request, Response } from "express";
import Status from "../models/Status.js";
import { upload } from "../utils/multer.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/create-status",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No image provided" });
        return;
      }

      const filePath = req.file.path.replace(/\\/g, "/");
      const status = new Status({
        image: filePath,
        time: new Date().toISOString(),
        userId: req.user!._id,
      });

      await status.save();
      res.json({ status: "ok" });
    } catch {
      res.status(400).json({ error: "Failed to create status" });
    }
  }
);

router.post("/fetch-user-status", async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(422).json({ error: "userId is required" });
    return;
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    // Fixed: use $gte to get statuses from the last 24 hours (not $lte which was a bug)
    const results = await Status.find({
      userId,
      time: { $gte: twentyFourHoursAgo.toISOString() },
    });

    res.json({ status: true, statuses: results });
  } catch {
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

export default router;
