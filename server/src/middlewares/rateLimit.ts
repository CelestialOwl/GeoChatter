import { Request, Response, NextFunction } from "express";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const { windowMs = 15 * 60 * 1000, max = 10, message = "Too many requests, please try again later" } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    // Skip rate limiting in test environment
    if (process.env.NODE_ENV === "test") {
      next();
      return;
    }

    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    if (entry.count >= max) {
      res.status(429).json({ error: message });
      return;
    }

    entry.count++;
    next();
  };
}

// Prebuilt limiter for auth endpoints: 10 attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many authentication attempts, please try again in 15 minutes",
});

// General API limiter: 100 requests per minute
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please slow down",
});
