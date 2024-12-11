import React, { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const List = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://todo-app-u4re.vercel.app/api/tasks"); // Replace with your Vercel backend URL
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const newTask = {
          text: task,
          isStarred: false,
          status: "Pending",
        };
        // Make a POST request to the backend to add the task
        const response = await axios.post("https://todo-app-u4re.vercel.app/api/tasks", newTask); // Replace with your Vercel backend URL
        setTasks([...tasks, response.data]);
        setTask(""); // Clear the input field after adding the task
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleStar = async (id) => {
    try {
      const response = await axios.patch(`https://todo-app-u4re.vercel.app/api/tasks/${id}/important`); // Replace with your Vercel backend URL
      const updatedTask = response.data;

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-app-u4re.vercel.app/api/tasks/${id}`); // Replace with your Vercel backend URL
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://todo-app-u4re.vercel.app/api/tasks/${id}`, { status }); // Replace with your Vercel backend URL
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditedText(task.text);
  };

  const saveEdit = async (id) => {
    try {
      const updatedTask = await axios.patch(`https://todo-app-u4re.vercel.app/api/tasks/${id}`, {
        text: editedText, // Update task text
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask.data : task
        )
      );
      setEditingTaskId(null); // End editing
      setEditedText(""); // Clear the edit field
    } catch (error) {
      console.error("Error saving task edit:", error);
    }
  };

  const toggleDropdown = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, showDropdown: !task.showDropdown } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen p-6 bg-gray-100 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-gray-700">To-Do List</h1>
        <div className="mt-6 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search list items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div
        className="mt-6 space-y-4 overflow-y-auto flex-grow"
        style={{
          maxHeight: "calc(100vh - 250px)", // Only scroll when the list exceeds available height
        }}
      >
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className={`flex items-center justify-between p-4 rounded-md shadow-sm
              border-2
              ${task.status === "Pending"
                ? "border-blue-500 text-blue-500"
                : task.status === "Completed"
                ? "border-green-500 text-green-500 line-through"
                : "border-pink-500 text-pink-500"
              }`}
          >
            <div className="relative">
              {/* Chevron Down Button for Status */}
              <button
                onClick={() => toggleDropdown(task._id)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FiChevronDown className="w-5 h-5" />
              </button>

              {/* Status Dropdown */}
              {task.showDropdown && (
                <ul
                  className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md z-50"
                  style={{
                    minWidth: "150px",
                  }}
                >
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => updateStatus(task._id, "Pending")}
                  >
                    Pending
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => updateStatus(task._id, "In Progress")}
                  >
                    In Progress
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => updateStatus(task._id, "Completed")}
                  >
                    Completed
                  </li>
                </ul>
              )}
            </div>
            <span className={`flex-grow ${task.status === "Completed" ? "line-through" : ""}`}>
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border p-2"
                />
              ) : (
                task.text
              )}
            </span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleStar(task._id)}
                className={`p-2 ${task.isStarred ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-600`}
              >
                <FaStar className="w-5 h-5" />
              </button>
              {editingTaskId === task._id ? (
                <button
                  onClick={() => saveEdit(task._id)}
                  className="p-2 text-green-500 hover:text-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(task)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-white mt-auto">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;