import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const orders = sqliteTable("orders", {
  id: text("id")
    .primaryKey()
    .$default(() => uuid()),
  createdAt: text("createdat")
    .notNull()
    .$default(() => new Date().toLocaleDateString()),
  status: text("status").default("pending"),
  userId: text("userid").notNull(),
  cartToken: text("carttoken").notNull(),
  payment: text("payment").notNull(),
  address: text("address").notNull(),
  contact: text("contact", { length: 10 }).notNull(),
});
