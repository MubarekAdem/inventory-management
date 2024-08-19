const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

router.post("/", async (req, res) => {
  const { name, category, quantity, price } = req.body;

  try {
    const newItem = new Item({ name, category, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, category, quantity, price },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
