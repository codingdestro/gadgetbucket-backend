import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { products } from "./products";

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userid").notNull(),
  pdId: uuid("pdid")
    .notNull()
    .references(() => products.id),
  cartToken: text("carttoken"),
});
