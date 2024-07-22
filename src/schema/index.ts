import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
// declaring the user table

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
});

export const StudentTable = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull(),
});
