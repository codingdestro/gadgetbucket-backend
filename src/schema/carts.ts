import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { products } from "./products";

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").notNull(),
  pdId: uuid("pdId")
    .notNull()
    .references(() => products.id),
  cartToken: text("cartToken"),
});
