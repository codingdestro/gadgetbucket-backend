import { drizzle } from "drizzle-orm/node-postgres";
import conf from "../__config__";
import * as schema from "../schema/index.ts";

import { Client } from "pg";
export const client = new Client({
  host: conf.get("db_host"),
  port: conf.get("db_port"),
  user: conf.get("db_user"),
  password: conf.get("db_password"),
  database: conf.get("db_database"),
});

async function initDb() {
  try {
    console.log("trying to connect with database ...");
    await client.connect();
    console.log("connected to the database!");
    const db = drizzle(client, { schema });
    return db;
  } catch (error) {
    console.log(error);
  }
}
export const db = await initDb();
