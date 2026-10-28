import {
  mysqlTable,
  varchar,
  text,
  int,
  double,
  json,
} from "drizzle-orm/mysql-core";

// Categories Table
export const categoriesTable = mysqlTable("categories", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 64 }).default("📁"),
  createdAt: varchar("created_at", { length: 128 }),
  updatedAt: varchar("updated_at", { length: 128 }),
});

// Products Table
export const productsTable = mysqlTable("products", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 128 }).default("Prestige"),
  regularPrice: double("regular_price").notNull(),
  salePrice: double("sale_price").notNull(),
  discountPercentage: int("discount_percentage").default(0),
  featuredImage: text("featured_image"),
  galleryImages: json("gallery_images"),
  variants: json("variants"),
  keyFeatures: json("key_features"),
  description: text("description"),
  benefits: json("benefits"),
  facilities: json("facilities"),
  deliveryInside: int("delivery_inside").default(60),
  deliveryOutside: int("delivery_outside").default(120),
  phoneNumber: varchar("phone_number", { length: 64 }).default("0123456789"),
  whatsappNumber: varchar("whatsapp_number", { length: 64 }).default("880123456789"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  seoImage: text("seo_image"),
  stock: int("stock").default(0),
  status: varchar("status", { length: 64 }).default("Active"),
  rating: double("rating").default(5.0),
  salesCount: int("sales_count").default(0),
  icon: varchar("icon", { length: 64 }).default("📦"),
  createdAt: varchar("created_at", { length: 128 }),
  updatedAt: varchar("updated_at", { length: 128 }),
});

// Orders Table
export const ordersTable = mysqlTable("orders", {
  id: varchar("id", { length: 128 }).primaryKey(),
  customer: varchar("customer", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  items: json("items").notNull(),
  totalAmount: double("total_amount").notNull(),
  status: varchar("status", { length: 64 }).default("Pending"),
  date: varchar("date", { length: 128 }),
  createdAt: varchar("created_at", { length: 128 }),
});
