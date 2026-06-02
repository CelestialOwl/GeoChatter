import mongoose from "mongoose";
import crypto from "crypto";

const Schema = mongoose.Schema;

export interface IRefreshToken {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  token: { type: String, required: true, unique: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Auto-delete expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString("hex");
}

export default RefreshToken;
