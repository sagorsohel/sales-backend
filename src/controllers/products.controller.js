import { products } from "../data/mockData.js";

// GET /api/products
export const getProducts = (req, res) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category && category !== "All") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
};

// GET /api/products/:id
export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
};

// POST /api/products
export const createProduct = (req, res) => {
  const { name, description, price, category, stock, icon } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and category are required fields.",
    });
  }

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    description: description || "",
    price: Number(price),
    category,
    stock: Number(stock) || 0,
    status: "Active",
    rating: 5.0,
    salesCount: 0,
    icon: icon || "📦",
    createdAt: new Date().toISOString(),
  };

  products.unshift(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
};

// PUT /api/products/:id
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} not found`,
    });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: products[index],
  });
};

// DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} not found`,
    });
  }

  const deleted = products.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deleted,
  });
};
