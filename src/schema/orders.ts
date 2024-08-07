import { pgTable, uuid, text, varchar, pgEnum } from "drizzle-orm/pg-core";

// Define the order status enum
export const orderStatus = pgEnum("status", [
  "ordered",
  "pending",
  "cancelled",
  "delivered",
]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  status: orderStatus("status").default("pending"),
  userId: uuid("userid").notNull(),
  cartToken: uuid("carttoken").notNull(),
  payment: text("payment").notNull(),
  address: text("address").notNull(),
  contact: varchar("contact", { length: 10 }).notNull(),
});
