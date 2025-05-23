const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

// GET /api/dishes – hämta alla rätter från databasen
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find(); // Hämtar alla dokument
    res.json(dishes); // Skickar tillbaka som JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/dishes – lägg till en ny rätt
router.post("/", async (req, res) => {
  try {
    const existing = await Dish.findOne({ name: req.body.name });
    if (existing) return res.status(409).send("Receptet finns redan");

    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/dishes/:id – ta bort en rätt
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Receptet hittades inte");
    res.send("Receptet har raderats");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/dishes/:id – uppdaterar en rätt med nytt innehåll
router.put("/:id", async (req, res) => {
  console.log("PUT begäran mottagen för id:", req.params.id);
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).send("Receptet hittades inte");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
