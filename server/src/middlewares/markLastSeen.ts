import { Request, Response, NextFunction } from "express";

export default function markLastSeen(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  // TODO: Update user's lastonline timestamp in DB
  next();
}
