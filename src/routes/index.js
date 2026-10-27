import { Router } from "express";
import productsRouter from "./products.routes.js";
import categoriesRouter from "./categories.routes.js";
import ordersRouter from "./orders.routes.js";
import analyticsRouter from "./analytics.routes.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "WideTech Sales Express API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/analytics", analyticsRouter);

export default apiRouter;
