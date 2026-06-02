import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const saveLocationSchema = z.object({
  email: z.string().email("Invalid email address"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const fetchProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const createRoomSchema = z.object({
  recipient: z.object({
    _id: z.string().min(1, "Recipient ID is required"),
  }),
});

export const fetchMessagesSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
});

export const createCommunitySchema = z.object({
  name: z
    .string()
    .min(2, "Community name must be at least 2 characters")
    .max(50, "Community name must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  type: z.boolean(),
});

export const communityActionSchema = z.object({
  CommunityId: z.string().min(1, "Community ID is required"),
});

export const communityUserActionSchema = z.object({
  CommunityId: z.string().min(1, "Community ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const saveHobbySchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Hobby name is required"),
  selected: z.boolean(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type SaveLocationInput = z.infer<typeof saveLocationSchema>;
export type FetchProfileInput = z.infer<typeof fetchProfileSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type FetchMessagesInput = z.infer<typeof fetchMessagesSchema>;
export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type CommunityActionInput = z.infer<typeof communityActionSchema>;
export type CommunityUserActionInput = z.infer<typeof communityUserActionSchema>;
export type SaveHobbyInput = z.infer<typeof saveHobbySchema>;
