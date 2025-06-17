import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";

const TaskReminder = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmTaskId, setConfirmTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();

        // Format date before setting state
        const formattedTasks = data.map((task) => ({
          ...task,
          dueDate: formatDate(task.dueDate),
        }));

        setTasks(formattedTasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle adding a new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const now = new Date();
    const newTaskObj = {
      title: newTask,
      dueDate: now.toISOString(), // Store ISO string format
      status: "Pending", // Default status
      createdAt: now.toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskObj),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const savedTask = await response.json();
      savedTask.dueDate = formatDate(savedTask.dueDate); // Format date for UI

      setTasks([...tasks, savedTask]); // Update UI
      setNewTask(""); // Clear input
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle marking task as completed
  const markAsCompleted = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // Update UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle marking task as completed
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update UI
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Confirm Completion
  const confirmCompletion = (taskId) => {
    setConfirmTaskId(taskId);
  };

  // Cancel Confirmation
  const cancelConfirmation = () => {
    setConfirmTaskId(null);
  };

  // Confirm Deletion
  const confirmDeletion = (taskId) => {
    setDeleteTaskId(taskId);
  };

  // Cancel Deletion
  const cancelDeletion = () => {
    setDeleteTaskId(null);
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold  mb-6">Task Reminder</h1>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          {/* Add Task Input */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task..."
                className="w-full p-2 border rounded-md"
              />
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>

          {/* Task Lists */}
          <div className="grid grid-cols-1 gap-6">
            {/* Upcoming Tasks */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
              <ul>
                {tasks
                  .filter((task) => task.status === "Pending")
                  .map((task) => (
                    <li
                      key={task._id}
                      className="border-b py-2 flex justify-between cursor-pointer hover:bg-gray-100 p-2"
                      onClick={() => confirmCompletion(task._id)}
                    >
                      <span>{task.title}</span>
                      <span className="text-gray-500 text-sm">
                        {task.dueDate}
                      </span>
                      <span className="text-blue-500 text-sm">
                        {task.status}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Task History */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Task History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-4 text-left">Task Title</th>
                      <th className="border-b p-4 text-left">
                        Completion Date
                      </th>
                      <th className="border-b p-4 text-left">Status</th>
                      <th className="border-b p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks
                      .filter((task) => task.status === "Completed")
                      .sort(
                        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                      )
                      .map((task) => (
                        <tr key={task._id} className="hover:bg-gray-100">
                          <td className="border-b p-4">{task.title}</td>
                          <td className="border-b p-4 text-gray-400 text-sm">
                            {task.dueDate}
                          </td>
                          <td className="border-b p-4 text-green-500 text-sm">
                            {task.status}
                          </td>
                          <td className="border-b p-4">
                            <button
                              onClick={() => confirmDeletion(task._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {confirmTaskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <h3 className="text-xl font-bold">Confirm Completion</h3>
            <p>Are you sure you want to complete this task?</p>
            <div className="flex justify-end space-x-4">
              <button className="text-gray-500" onClick={cancelConfirmation}>
                Cancel
              </button>
              <button
                className="text-green-600"
                onClick={() => {
                  markAsCompleted(confirmTaskId);
                  setConfirmTaskId(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTaskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <h3 className="text-xl font-bold">Confirm Completion</h3>
            <p>Are you sure you want to Delete this task?</p>
            <div className="flex justify-end space-x-4">
              <button className="text-gray-500" onClick={cancelDeletion}>
                Cancel
              </button>
              <button
                className="text-green-600"
                onClick={() => {
                  deleteTask(deleteTaskId);
                  setDeleteTaskId(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskReminder;
