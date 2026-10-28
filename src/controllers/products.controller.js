import { eq, like, or } from "drizzle-orm";
import { db } from "../db/index.js";
import { productsTable } from "../db/schema.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let allProducts = await db.select().from(productsTable);

    if (category && category !== "All") {
      allProducts = allProducts.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const term = search.toLowerCase();
      allProducts = allProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      [product] = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.slug, id));
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID or slug '${id}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description = "",
      regularPrice,
      salePrice,
      category,
      brand = "Prestige",
      stock = 0,
      featuredImage = "",
      galleryImages = [],
      variants = [],
      keyFeatures = [],
      deliveryInside = 60,
      deliveryOutside = 120,
      phoneNumber = "0123456789",
      whatsappNumber = "880123456789",
      benefits = [],
      facilities = [],
      seoTitle,
      seoDescription,
      seoImage,
      icon = "📦",
    } = req.body;

    if (!name || salePrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and sale price are required fields.",
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

    const autoSeoTitle = seoTitle?.trim() || `${name} | WideTech Enterprise`;
    const autoSeoDescription =
      seoDescription?.trim() || description.slice(0, 160);
    const autoSeoImage = seoImage?.trim() || featuredImage || "";

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug,
      category: category?.trim() || "General",
      brand: brand.trim() || "Prestige",
      description,
      regularPrice: numRegularPrice,
      salePrice: numSalePrice,
      discountPercentage: discount,
      stock: Number(stock) || 0,
      featuredImage,
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
      variants: Array.isArray(variants) ? variants : [],
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      deliveryInside: Number(deliveryInside) || 60,
      deliveryOutside: Number(deliveryOutside) || 120,
      phoneNumber: String(phoneNumber || "0123456789").trim(),
      whatsappNumber: String(whatsappNumber || "880123456789").trim(),
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
      updatedAt: new Date().toISOString(),
    };

    await db.insert(productsTable).values(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully in MySQL database",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
    }

    const regularPrice =
      req.body.regularPrice !== undefined
        ? Number(req.body.regularPrice)
        : existing.regularPrice;
    const salePrice =
      req.body.salePrice !== undefined
        ? Number(req.body.salePrice)
        : existing.salePrice;

    const discount =
      regularPrice > salePrice
        ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
        : 0;

    const updates = {
      ...req.body,
      regularPrice,
      salePrice,
      discountPercentage: discount,
      updatedAt: new Date().toISOString(),
    };

    if (req.body.stock !== undefined) {
      updates.stock = Number(req.body.stock) || 0;
    }
    if (req.body.deliveryInside !== undefined) {
      updates.deliveryInside = Number(req.body.deliveryInside) || 60;
    }
    if (req.body.deliveryOutside !== undefined) {
      updates.deliveryOutside = Number(req.body.deliveryOutside) || 120;
    }

    // Remove immutable fields if passed
    delete updates.id;
    delete updates.createdAt;

    await db
      .update(productsTable)
      .set(updates)
      .where(eq(productsTable.id, id));

    const [updated] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    res.status(200).json({
      success: true,
      message: "Product updated successfully in MySQL",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
    }

    await db.delete(productsTable).where(eq(productsTable.id, id));

    res.status(200).json({
      success: true,
      message: "Product deleted successfully from MySQL",
      data: existing,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
