import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

const router = Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id/status").patch(updateOrderStatus);

export default router;
