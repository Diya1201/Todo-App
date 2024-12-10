import React, { useEffect, useState } from "react";
import { FaStar, FaSync } from "react-icons/fa";

const Important = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImportantTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tasks");
                if (!response.ok) throw new Error("Failed to fetch tasks.");
                const data = await response.json();
                const importantTasks = data.filter((task) => task.isStarred);
                setTasks(importantTasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchImportantTasks();
    }, []);

    const refreshTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/tasks");
            const data = await response.json();
            const importantTasks = data.filter((task) => task.isStarred);
            setTasks(importantTasks);
        } catch (err) {
            setError("Error refreshing tasks.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-gray-500">Loading important tasks...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="h-screen p-6 bg-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-700">Important Tasks</h1>
                <button
                    onClick={refreshTasks}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                    <FaSync className="mr-2" /> Refresh
                </button>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <ul className="space-y-3">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li
                                key={task._id}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm"
                            >
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500 mr-3" />
                                    <span>{task.text}</span>
                                </div>
                                <span className="text-sm text-gray-500">{task.status}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No important tasks available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Important;