import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { categoriesTable, productsTable } from "../db/schema.js";

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const allCategories = await db.select().from(categoriesTable);
    const allProducts = await db.select().from(productsTable);

    // Attach product counts dynamically
    const categoriesWithCount = allCategories.map((cat) => {
      const count = allProducts.filter(
        (p) => p.category?.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return { ...cat, productCount: count };
    });

    res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      data: categoriesWithCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

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
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
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
      name: name.trim(),
      slug,
      description: description || "",
      icon: icon || "📁",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.insert(categoriesTable).values(newCategory);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${id} not found`,
      });
    }

    const prevName = existing.name;
    const { name, description, icon } = req.body;
    const updates = { updatedAt: new Date().toISOString() };

    if (name) {
      updates.name = name.trim();
      updates.slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");

      // Update linked products category name in MySQL
      if (name !== prevName) {
        await db
          .update(productsTable)
          .set({ category: name.trim() })
          .where(eq(productsTable.category, prevName));
      }
    }

    if (description !== undefined) updates.description = description;
    if (icon !== undefined) updates.icon = icon;

    await db
      .update(categoriesTable)
      .set(updates)
      .where(eq(categoriesTable.id, id));

    const [updated] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${id} not found`,
      });
    }

    await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: existing,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
