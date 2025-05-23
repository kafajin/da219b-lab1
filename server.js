const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dishRoutes = require("./lab1/routes/dishRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// REST endpoints
app.use("/api/dishes", dishRoutes);

// Frontend
app.use(express.static("public"));

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
