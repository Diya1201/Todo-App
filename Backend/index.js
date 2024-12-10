const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks'); // Import task routes

dotenv.config(); // Load environment variables

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

// Export the Express app as a serverless function for Vercel
module.exports = app;
