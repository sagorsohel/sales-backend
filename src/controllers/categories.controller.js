import { categories, products } from "../data/mockData.js";

// GET /api/categories
export const getCategories = (req, res) => {
  // Attach product counts
  const categoriesWithCount = categories.map((cat) => {
    const count = products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase()
    ).length;
    return { ...cat, productCount: count };
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categoriesWithCount,
  });
};

// GET /api/categories/:id
export const getCategoryById = (req, res) => {
  const { id } = req.params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Category with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

// POST /api/categories
export const createCategory = (req, res) => {
  const { name, description, icon } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const newCategory = {
    id: `cat-${Date.now()}`,
    name,
    slug,
    description: description || "",
    icon: icon || "📁",
    createdAt: new Date().toISOString(),
  };

  categories.push(newCategory);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
};

// PUT /api/categories/:id
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Category with ID ${id} not found`,
    });
  }

  const prevName = categories[index].name;
  const { name, description, icon } = req.body;

  if (name && name !== prevName) {
    categories[index].name = name;
    categories[index].slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    // Also update products referencing this category name
    products.forEach((p) => {
      if (p.category === prevName) {
        p.category = name;
      }
    });
  }

  if (description !== undefined) categories[index].description = description;
  if (icon !== undefined) categories[index].icon = icon;
  categories[index].updatedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: categories[index],
  });
};

// DELETE /api/categories/:id
export const deleteCategory = (req, res) => {
  const { id } = req.params;
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Category with ID ${id} not found`,
    });
  }

  const deleted = categories.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: deleted,
  });
};
