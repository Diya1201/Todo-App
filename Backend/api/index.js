import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from '../routes/tasks'; // Import task routes
import { createServer } from '@vercel/node';

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

// Export the Express app as a serverless function
export default createServer(app);
