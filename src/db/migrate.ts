import { exit } from "process";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import conf from "../__config__";

import * as schema from "../schema/index.ts";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const client = new Database(conf.get("db_url"));

async function initDb() {
  try {
    console.log("trying to connect with database ...");
    const db = await drizzle(client, { schema });
    console.log("connected to database");
    console.log("migrating");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("migrated successfully");
    return db;
  } catch (error) {
    console.log(error);
    exit(1);
  }
}

initDb();
