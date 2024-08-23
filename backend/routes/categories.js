const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const Category = require("../models/Category");

// Create a new category
router.post("/", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

// Get all categories
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
