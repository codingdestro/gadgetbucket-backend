import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const Users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$default(() => uuid()),
  name: text("name", { length: 50 }).notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  cartToken: text("carttoken"),
});
