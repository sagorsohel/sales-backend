import { products, orders } from "../data/mockData.js";

// GET /api/analytics/dashboard
export const getDashboardMetrics = (req, res) => {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Category breakdown
  const categoryCount = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  // Recent 5 activities
  const recentOrders = orders.slice(0, 5);

  res.status(200).json({
    success: true,
    data: {
      metrics: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalStock,
        conversionRate: "4.8%",
        activeUsers: "12,480",
      },
      categories: categoryCount,
      recentOrders,
    },
  });
};
