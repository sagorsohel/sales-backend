import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*", // allow requests from website (3000) and admin (5173)
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to WideTech Sales Express API",
    healthCheck: "/api/health",
    endpoints: {
      products: "/api/products",
      orders: "/api/orders",
      analytics: "/api/analytics/dashboard",
    },
  });
});

// Mount API routes
const apiPrefix = process.env.API_PREFIX || "/api";
app.use(apiPrefix, apiRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
