const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Connect to MongoDB and start server
mongoose
  .connect(
    "mongodb+srv://hasarasankalpa176:WiPQMFBmzt5lKYMk@users.va8qfqn.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
