const mongoose = require("mongoose");

// Definierar ett schema för ett recept (Dish)
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Namn måste anges
  },
  ingredients: {
    type: [String], // En lista av ingredienser (strängar)
    required: true,
  },
  preparationSteps: {
    type: String, // Text som beskriver tillagningen
    required: true,
  },
  cookingTime: {
    type: String, // Tillagningstid (kan vara i minuter, timmar osv)
    required: true,
  },
  origin: {
    type: String, // Ursprungsland/kultur
    required: true,
  },
  spiceLevel: {
    type: String, // T.ex. Mild, Medium, Stark – valfritt
    default: "Okänd",
  },
});

// Skapar en modell baserat på schemat ovan
const Dish = mongoose.model("Dish", dishSchema);

// Exporterar modellen så den kan användas i t.ex. dishRoutes.js
module.exports = Dish;
