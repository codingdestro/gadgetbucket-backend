import { defineConfig } from "drizzle-kit";
import conf from "./src/__config__";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "mydb.sqlite",
  },
});
