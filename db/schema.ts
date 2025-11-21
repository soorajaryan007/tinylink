import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  code: varchar("code", { length: 8 }).primaryKey(),
  url: text("url").notNull(),
  clickCount: integer("click_count").default(0),
  lastClicked: timestamp("last_clicked"),
  createdAt: timestamp("created_at").defaultNow(),
});
