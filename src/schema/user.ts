import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  cartToken: text("carttoken"),
});
