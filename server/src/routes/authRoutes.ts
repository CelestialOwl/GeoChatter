import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import RefreshToken, { generateRefreshToken } from "../models/RefreshToken.js";
import { env } from "../config/env.js";
import { validate } from "../validators/validate.js";
import { signupSchema, signinSchema } from "../validators/schemas.js";
import { authLimiter } from "../middlewares/rateLimit.js";

const router = Router();

const REFRESH_TOKEN_DAYS = 30;
const ACCESS_TOKEN_EXPIRY = "15m";

function issueAccessToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

async function issueRefreshToken(userId: string): Promise<string> {
  const token = generateRefreshToken();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ token, userId, expiresAt });
  return token;
}

router.post("/signup", authLimiter, validate(signupSchema), async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(422).json({ error: "Email is already in use" });
      return;
    }

    const user = new User({ email, password, username });
    await user.save();

    const accessToken = issueAccessToken(user._id.toString());
    const refreshToken = await issueRefreshToken(user._id.toString());

    res.status(201).json({ token: accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: "Failed to create account" });
  }
});

router.post("/signin", authLimiter, validate(signinSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  try {
    await user.comparePassword(password);
    const accessToken = issueAccessToken(user._id.toString());
    const refreshToken = await issueRefreshToken(user._id.toString());
    res.json({ token: accessToken, refreshToken });
  } catch {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

router.post("/refresh-token", authLimiter, async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  try {
    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored || stored.expiresAt < new Date()) {
      res.status(401).json({ error: "Invalid or expired refresh token" });
      return;
    }

    // Rotate: delete old, issue new
    await RefreshToken.deleteOne({ _id: stored._id });

    const accessToken = issueAccessToken(stored.userId.toString());
    const newRefreshToken = await issueRefreshToken(stored.userId.toString());

    res.json({ token: accessToken, refreshToken: newRefreshToken });
  } catch {
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
  res.json({ message: "Logged out" });
});

export default router;
