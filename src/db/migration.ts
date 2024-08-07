import { client } from ".";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "../schema/index.ts";

async function migration() {
  try {
    console.log("trying to connect with database ...");
    console.log("connected to the database!");
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });
    client.end();
    console.log("migration completed!");
  } catch (error) {
    console.log(error);
  }
}

migration();
