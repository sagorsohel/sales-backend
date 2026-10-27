import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`🚀 Sales Express Backend Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
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
