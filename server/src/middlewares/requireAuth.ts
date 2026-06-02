import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/Users.js";
import { env } from "../config/env.js";
import { AuthenticationError } from "../errors.js";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });
    return;
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.status(401).json({ error: "You must be logged in" });
      return;
    }

    const { userId } = payload as { userId: string };
    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  });
}
