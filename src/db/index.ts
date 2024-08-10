import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import conf from "../__config__";

import * as schema from "../schema/index.ts";

export const client = createClient({
  url: conf.get("db_url"),
  authToken: conf.get("db_authtoken"),
});

async function initDb() {
  try {
    console.log("trying to connect with database ...");
    const db = await drizzle(client, { schema });
    console.log("connected to database");
    return db;
  } catch (error) {
    console.log(error);
  }
}
export const db = await initDb();
