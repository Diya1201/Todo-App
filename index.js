const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks'); // Import task routes

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app


const corsOptions={
  origin: false 
};
// Allow only specific frontend to access the backend
//const allowedOrigins = ['https://todo-cp8jfticn-diya1201s-projects.vercel.app'];
/*
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny request
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};

//app.use(cors(corsOptions));
// Allow CORS for all domains (not recommended for production)
app.use(cors({
  origin: 'https://todo-app-iota-fawn.vercel.app', // Only allow requests from your frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
*/
app.use(cors(corsOptions));
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
