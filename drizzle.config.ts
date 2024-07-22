import conf from "./src/__config__";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: conf.get("db_host"),
    port: conf.get("db_port"),
    user: conf.get("db_user"),
    password: conf.get("db_password"),
    database: conf.get("db_database"),
  },
});
