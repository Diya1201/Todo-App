const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the tasks router
const tasksRouter = require('./routes/tasks');  // Adjust the path to your tasks.js file

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error: ', err));

// Use the tasks router for the /api/tasks route
app.use('/api/tasks', tasksRouter);

// Default Route
app.get('/', (req, res) => {
    res.json("Hello");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
