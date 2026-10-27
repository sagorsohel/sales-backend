import { orders } from "../data/mockData.js";

// GET /api/orders
export const getOrders = (req, res) => {
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
};

// POST /api/orders
export const createOrder = (req, res) => {
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
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: newOrder,
  });
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order with ID ${id} not found`,
    });
  }

  if (status) {
    order.status = status;
  }

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
};
