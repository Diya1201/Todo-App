import { v4 as uuidv4 } from "uuid"; // For generating unique IDs (install `uuid` with `npm i uuid`)

let tasks = [
  { id: uuidv4(), text: "Task 1", status: "Pending", isStarred: false },
  { id: uuidv4(), text: "Task 2", status: "In Progress", isStarred: true },
  { id: uuidv4(), text: "Task 3", status: "Completed", isStarred: false },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      // Fetch all tasks
      res.status(200).json({ success: true, data: tasks });
      break;
    }

    case "POST": {
      // Add a new task
      const { text, status, isStarred } = req.body;

      if (!text || !status) {
        return res.status(400).json({ success: false, message: "Missing fields" });
      }

      const newTask = { id: uuidv4(), text, status, isStarred: !!isStarred };
      tasks.push(newTask);

      res.status(201).json({ success: true, data: newTask });
      break;
    }

    case "PUT": {
      // Update an existing task
      const { id, text, status, isStarred } = req.body;

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }

      tasks[taskIndex] = { ...tasks[taskIndex], text, status, isStarred };
      res.status(200).json({ success: true, data: tasks[taskIndex] });
      break;
    }

    case "DELETE": {
      // Delete a task
      const { id } = req.body;

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }

      const deletedTask = tasks.splice(taskIndex, 1);
      res.status(200).json({ success: true, data: deletedTask });
      break;
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
