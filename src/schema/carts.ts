import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

import { products } from "./products";

export const carts = sqliteTable("carts", {
  id: text("id")
    .primaryKey()
    .$default(() => uuid()),
  userId: text("userid").notNull(),
  pdId: text("pdid")
    .notNull()
    .references(() => products.id),
  cartToken: text("carttoken"),
});
