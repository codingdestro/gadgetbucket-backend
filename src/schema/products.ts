import { pgTable, text, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  img: text("img").notNull(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  textPrice: text("textPrice").notNull(),
  category: varchar("category", { length: 20 }).notNull(),
  subCategory: varchar("subCategory", { length: 20 }).notNull(),
});
