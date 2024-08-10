import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$default(() => uuid()),
  img: text("img").notNull(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  textPrice: text("textPrice").notNull(),
  category: text("category", { length: 20 }).notNull(),
  subCategory: text("subCategory", { length: 20 }).notNull(),
});
