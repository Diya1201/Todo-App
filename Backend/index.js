const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const taskRoutes = require("./routes/tasks"); // Import task routes

const app = express(); // Initialize Express app

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tasks", taskRoutes); // Use task routes

// Health Check Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Port
const PORT = process.env.PORT || 5000; // Set port from environment variables or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
