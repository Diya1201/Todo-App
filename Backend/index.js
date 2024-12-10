const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks'); // Import task routes

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app

// CORS Configuration
const allowedOrigins = [
  'https://todo-app-iota-fawn.vercel.app'  // Allow only requests from the deployed Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests without an origin (like mobile apps or Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// Middleware
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

// Listen on a port (e.g., 5000) when running locally
// Export the Express app as a serverless function for Vercel
module.exports = app;
