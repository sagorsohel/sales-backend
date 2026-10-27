import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema.js";
import { categoriesTable, productsTable, ordersTable } from "./schema.js";
import { categories, products, orders } from "../data/mockData.js";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sales_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema, mode: "default" });

export async function initDb() {
  try {
    const conn = await pool.getConnection();

    // Create tables if not exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(128) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(64) DEFAULT '📁',
        created_at VARCHAR(128),
        updated_at VARCHAR(128)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(128) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        regular_price DOUBLE NOT NULL,
        sale_price DOUBLE NOT NULL,
        discount_percentage INT DEFAULT 0,
        featured_image TEXT,
        gallery_images JSON,
        description TEXT,
        benefits JSON,
        facilities JSON,
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_image TEXT,
        stock INT DEFAULT 0,
        status VARCHAR(64) DEFAULT 'Active',
        rating DOUBLE DEFAULT 5.0,
        sales_count INT DEFAULT 0,
        icon VARCHAR(64) DEFAULT '📦',
        created_at VARCHAR(128),
        updated_at VARCHAR(128)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(128) PRIMARY KEY,
        customer VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        items JSON NOT NULL,
        total_amount DOUBLE NOT NULL,
        status VARCHAR(64) DEFAULT 'Pending',
        date VARCHAR(128),
        created_at VARCHAR(128)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Check if categories table is empty, seed if so
    const [existingCategories] = await conn.query("SELECT COUNT(*) AS count FROM categories");
    if (existingCategories[0].count === 0) {
      console.log("🌱 Seeding initial categories into MySQL...");
      for (const cat of categories) {
        await db.insert(categoriesTable).values({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
          createdAt: cat.createdAt || new Date().toISOString(),
        });
      }
    }

    // Check if products table is empty, seed if so
    const [existingProducts] = await conn.query("SELECT COUNT(*) AS count FROM products");
    if (existingProducts[0].count === 0) {
      console.log("🌱 Seeding initial products into MySQL...");
      for (const prod of products) {
        await db.insert(productsTable).values({
          id: prod.id,
          name: prod.name,
          slug: prod.slug || prod.id,
          category: prod.category,
          regularPrice: Number(prod.regularPrice) || Number(prod.salePrice) || 0,
          salePrice: Number(prod.salePrice) || 0,
          discountPercentage: Number(prod.discountPercentage) || 0,
          featuredImage: prod.featuredImage || "",
          galleryImages: prod.galleryImages || [],
          description: prod.description || "",
          benefits: prod.benefits || [],
          facilities: prod.facilities || [],
          seoTitle: prod.seoTitle || prod.name,
          seoDescription: prod.seoDescription || prod.description,
          seoImage: prod.seoImage || prod.featuredImage,
          stock: Number(prod.stock) || 0,
          status: prod.status || "Active",
          rating: Number(prod.rating) || 5.0,
          salesCount: Number(prod.salesCount) || 0,
          icon: prod.icon || "📦",
          createdAt: prod.createdAt || new Date().toISOString(),
        });
      }
    }

    // Check if orders table is empty, seed if so
    const [existingOrders] = await conn.query("SELECT COUNT(*) AS count FROM orders");
    if (existingOrders[0].count === 0) {
      console.log("🌱 Seeding initial orders into MySQL...");
      for (const ord of orders) {
        await db.insert(ordersTable).values({
          id: ord.id,
          customer: ord.customer,
          email: ord.email,
          items: ord.items || [],
          totalAmount: Number(ord.totalAmount) || 0,
          status: ord.status || "Completed",
          date: ord.date || new Date().toISOString(),
          createdAt: ord.date || new Date().toISOString(),
        });
      }
    }

    conn.release();
    console.log("✅ Drizzle ORM connected to MySQL database: 'sales_db' on port " + (process.env.DB_PORT || 3306));
  } catch (err) {
    console.error("❌ MySQL Database initialization error:", err.message);
  }
}

export default db;
