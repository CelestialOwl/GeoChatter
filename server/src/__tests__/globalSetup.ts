/**
 * Global setup for Jest - runs once before all test suites.
 * Sets environment variables needed by the app.
 */
export default async function globalSetup(): Promise<void> {
  process.env.JWT_SECRET = "test-secret-key-that-is-at-least-32-characters-long";
  process.env.MONGO_LOCAL_URL = "mongodb://localhost:27017/geochatter-test";
  process.env.NODE_ENV = "test";
  process.env.PORT = "0";
}
