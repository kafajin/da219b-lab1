// Importerar Express och skapar en router
const express = require("express");
const router = express.Router();

// Importerar Mongoose-modellen för recept (Dish)
const Dish = require("../models/Dish");

// GET /api/dishes – Hämta alla recept från databasen
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find(); // Hämta alla rätter från databasen
    res.json(dishes); // Skicka tillbaka som JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Serverfel
  }
});

// POST /api/dishes – Skapa ett nytt recept
router.post("/", async (req, res) => {
  try {
    // Kontrollera om receptet redan finns (baserat på namn)
    const existing = await Dish.findOne({ name: req.body.name });
    if (existing) return res.status(409).send("Receptet finns redan");

    // Skapa nytt recept och spara till databasen
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish); // Skicka tillbaka det skapade receptet
  } catch (err) {
    res.status(400).json({ message: err.message }); // Fel i indata
  }
});

// DELETE /api/dishes/:id – Ta bort ett recept
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Receptet hittades inte");
    res.send("Receptet har raderats"); // Bekräftelsemeddelande
  } catch (err) {
    res.status(500).json({ message: err.message }); // Serverfel
  }
});

// PUT /api/dishes/:id – Uppdatera ett recept
router.put("/:id", async (req, res) => {
  console.log("PUT begäran mottagen för id:", req.params.id);
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returnera det uppdaterade dokumentet
    });
    if (!updated) return res.status(404).send("Receptet hittades inte");
    res.json(updated); // Skicka tillbaka det uppdaterade receptet
  } catch (err) {
    res.status(400).json({ message: err.message }); // Fel vid uppdatering
  }
});

// Exporterar routern så att den kan användas i server.js
module.exports = router;
