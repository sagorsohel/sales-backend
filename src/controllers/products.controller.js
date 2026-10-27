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
  const {
    name,
    description = "",
    regularPrice,
    salePrice,
    category,
    stock = 0,
    featuredImage = "",
    galleryImages = [],
    benefits = [],
    facilities = [],
    seoTitle,
    seoDescription,
    seoImage,
    icon = "📦",
  } = req.body;

  if (!name || salePrice === undefined || !category) {
    return res.status(400).json({
      success: false,
      message: "Name, sale price, and category are required fields.",
    });
  }

  const numRegularPrice = Number(regularPrice) || Number(salePrice);
  const numSalePrice = Number(salePrice);
  const discount =
    numRegularPrice > numSalePrice
      ? Math.round(((numRegularPrice - numSalePrice) / numRegularPrice) * 100)
      : 0;

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  // Auto SEO values if not provided
  const autoSeoTitle = seoTitle?.trim() || `${name} | WideTech Enterprise`;
  const autoSeoDescription =
    seoDescription?.trim() || description.slice(0, 160);
  const autoSeoImage = seoImage?.trim() || featuredImage || "";

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    slug,
    description,
    regularPrice: numRegularPrice,
    salePrice: numSalePrice,
    discountPercentage: discount,
    category,
    stock: Number(stock) || 0,
    featuredImage,
    galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
    benefits: Array.isArray(benefits) ? benefits : [],
    facilities: Array.isArray(facilities) ? facilities : [],
    seoTitle: autoSeoTitle,
    seoDescription: autoSeoDescription,
    seoImage: autoSeoImage,
    status: "Active",
    rating: 5.0,
    salesCount: 0,
    icon,
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

  const current = products[index];
  const regularPrice =
    req.body.regularPrice !== undefined
      ? Number(req.body.regularPrice)
      : current.regularPrice;
  const salePrice =
    req.body.salePrice !== undefined
      ? Number(req.body.salePrice)
      : current.salePrice;

  const discount =
    regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  products[index] = {
    ...current,
    ...req.body,
    regularPrice,
    salePrice,
    discountPercentage: discount,
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
