// routes/shops.js
const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");

// Get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new shop
router.post("/", async (req, res) => {
  const shop = new Shop({
    name: req.body.name,
    location: req.body.location,
  });

  try {
    const newShop = await shop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
