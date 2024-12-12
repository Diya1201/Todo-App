const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Assuming this is the task model

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const { text, status } = req.body;
        const newTask = new Task({ text, status });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

// Update task (status, text, isStarred, etc.)
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { text, isStarred, status } = req.body; // Editable fields

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { text, isStarred, status }, // Only update provided fields
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Error updating task", error: err });
    }
});

// Toggle important status
router.patch("/:id/important", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.isStarred = !task.isStarred;  // Toggle the 'isStarred' field
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task importance", error });
    }
});

module.exports = router;
