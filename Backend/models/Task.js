const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        isStarred: { type: Boolean, default: false },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
