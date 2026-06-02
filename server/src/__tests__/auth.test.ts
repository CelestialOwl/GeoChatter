import request from "supertest";
import { createApp } from "../app.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./setup.js";
import User from "../models/Users.js";
import type { Express } from "express";

let app: Express;

beforeAll(async () => {
  // Set env vars for testing
  process.env.JWT_SECRET = "test-secret-key-that-is-at-least-32-characters-long";
  process.env.MONGO_LOCAL_URL = "mongodb://localhost:27017/test"; // overridden by memory server
  process.env.NODE_ENV = "test";

  await connectTestDB();
  app = createApp();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("POST /signup", () => {
  it("should create a new user and return a token", async () => {
    const res = await request(app).post("/signup").send({
      email: "test@example.com",
      password: "password123",
      username: "testuser",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");

    // Verify user was saved
    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
    expect(user!.username).toBe("testuser");
    // Password should be hashed
    expect(user!.password).not.toBe("password123");
  });

  it("should reject duplicate emails", async () => {
    await request(app).post("/signup").send({
      email: "test@example.com",
      password: "password123",
      username: "testuser",
    });

    const res = await request(app).post("/signup").send({
      email: "test@example.com",
      password: "password456",
      username: "testuser2",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Email is already in use");
  });

  it("should reject invalid email format", async () => {
    const res = await request(app).post("/signup").send({
      email: "not-an-email",
      password: "password123",
      username: "testuser",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.details[0].field).toBe("email");
  });

  it("should reject passwords shorter than 8 characters", async () => {
    const res = await request(app).post("/signup").send({
      email: "test@example.com",
      password: "short",
      username: "testuser",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.details[0].field).toBe("password");
  });

  it("should reject usernames with special characters", async () => {
    const res = await request(app).post("/signup").send({
      email: "test@example.com",
      password: "password123",
      username: "test user!",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.details[0].field).toBe("username");
  });

  it("should reject empty request body", async () => {
    const res = await request(app).post("/signup").send({});

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
  });
});

describe("POST /signin", () => {
  beforeEach(async () => {
    // Create a user for signin tests
    await request(app).post("/signup").send({
      email: "existing@example.com",
      password: "password123",
      username: "existinguser",
    });
  });

  it("should return a token for valid credentials", async () => {
    const res = await request(app).post("/signin").send({
      email: "existing@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("should reject invalid password", async () => {
    const res = await request(app).post("/signin").send({
      email: "existing@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("should reject non-existent email", async () => {
    const res = await request(app).post("/signin").send({
      email: "nobody@example.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("should reject missing email", async () => {
    const res = await request(app).post("/signin").send({
      password: "password123",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
  });

  it("should reject missing password", async () => {
    const res = await request(app).post("/signin").send({
      email: "existing@example.com",
    });

    expect(res.status).toBe(422);
    expect(res.body.error).toBe("Validation failed");
  });
});
