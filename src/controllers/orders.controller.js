import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { ordersTable } from "../db/schema.js";

// GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const allOrders = await db.select().from(ordersTable);
    res.status(200).json({
      success: true,
      count: allOrders.length,
      data: allOrders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customer, email, items, totalAmount } = req.body;

    if (!customer || !email || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Customer name, email, and at least one item are required.",
      });
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer,
      email,
      items,
      totalAmount: Number(totalAmount) || 0,
      status: "Pending",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await db.insert(ordersTable).values(newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully in MySQL",
      data: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [existing] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Order with ID ${id} not found`,
      });
    }

    await db
      .update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.id, id));

    const [updated] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id));

    res.status(200).json({
      success: true,
      message: "Order status updated in MySQL",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
