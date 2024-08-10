//import conf from "./src/__config__";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "libsql://gadgetbucket-codingdestro.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3MjM4NTI4MDIsImlhdCI6MTcyMzI4NDk3NCwiaWQiOiI5MDk5ZmZiMS1jMGMxLTQyMTUtYjkzZS02MThlNjg5Y2VhYmMifQ.BC9PMfmX3igoSGThFA8Ov5DNtXZOvUu5E0nqoAzofS3koHTMHl4QEDC4QhoZgvdIFboyXRgq6ew6Wo7X0mW3B",
  },
});
