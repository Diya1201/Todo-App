import React, { useEffect, useState } from "react";

const Status = () => {
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("Pending");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("https://stark-ravine-55105-4213c3435c17.herokuapp.com/api/tasks");
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError("Failed to fetch tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter(task => task.status === activeTab);

    if (loading) {
        return <p className="text-gray-500">Loading tasks...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="h-screen p-6 bg-gray-100 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">Task Status</h1>
            <div className="flex space-x-4 mb-4" role="tablist">
                {["Pending", "In Progress", "Completed"].map(status => (
                    <button
                        key={status}
                        role="tab"
                        aria-selected={activeTab === status}
                        className={`px-4 py-2 rounded ${
                            activeTab === status
                                ? "bg-blue-500 text-white font-bold"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTab(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <div
                className="bg-white p-4 rounded shadow overflow-y-auto"
                style={{ maxHeight: "300px" }}
            >
                <h2 className="text-xl font-semibold text-gray-600 mb-3">{activeTab} Tasks</h2>
                <ul className="space-y-3">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <li
                                key={task._id}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm"
                            >
                                <span>{task.text}</span>
                                <span className="text-sm text-gray-500">{task.status}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks in this category.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Status;