import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDb } from "./db/index.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Initialize MySQL tables and Drizzle schema
  await initDb();

  const server = app.listen(PORT, () => {
    console.log("=========================================");
    console.log(`🚀 Sales Express Backend Server running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🗄️ Database: MySQL (Drizzle ORM) on port ${process.env.DB_PORT || 3306}`);
    console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log("=========================================");
  });

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("Shutting down Express server...");
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer();
