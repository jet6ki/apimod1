const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// POST: Add new menu item
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: "Menu item added", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;