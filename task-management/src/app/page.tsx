"use client";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import TaskHistoryModal from "./components/TaskHistoryModal";
import { useRouter } from "next/navigation";

interface Tasks {
  task: Task,
  user: User
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}
interface User {
  id: string;                // Unique identifier for the user
  firstName: string;        // User's first name
  lastName: string;         // User's last name
  email: string;            // User's email address
  password: string;         // User's password (hashed)
  phoneNumber: string;      // User's phone number
  gender: 'M' | 'F';        // User's gender (can be 'M' or 'F')
  role: string;             // User's role (e.g., 'user', 'admin')
  createdAt: Date;          // Timestamp of when the user was created
  updatedAt: Date;          // Timestamp of when the user was last updated
}


const Tasks = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState('')

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await api.get(`/tasks?status=${filter}&search=${search}`);
      console.log(data.data);
      setTasks(data.data);

    };
    fetchTasks();
  }, [filter, search, page]);

  const handleClick = () => {
    router.push('/tasks/add');
  };
  const handleEdit = (id: string) => {
    router.push(`/tasks/${id}/edit`);
  };
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.task.id !== id));
      } catch (err) {
        console.log(err);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  const openModal = async (id: string) => {
    const { data } = await api.get(`/tasks/${id}/history`);
    console.log(data.data);
    setTaskHistory(data.data.history);
    setModalOpen(true);
  };



  if (!isAuthenticated) {
    return <p>You must log in to view this page.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <div className="flex justify-between items-center mb-4">
        <div className="mr-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleClick}
          >
            Add Task
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.task.id} className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800">{task.task.title}</h2>
              <p className="text-gray-600">{task.task.description}</p>
              <p className="text-sm text-gray-500">Status: <span className={`font-medium ${task.task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>{task.task.status}</span></p>
              <p className="text-sm text-blue-500"> {task.user.firstName} {task.user.lastName}</p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => openModal(task.task.id)}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  View History
                </button>
                <TaskHistoryModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  history={taskHistory}
                />
                <button
                  onClick={() => handleEdit(task.task.id)}
                  className="text-red-500 hover:underline focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.task.id)}
                  className="text-red-500 hover:underline focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available.</p>
        )}
      </ul>
      <div className="flex mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 mr-2">
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="p-2">
          Next
        </button>
      </div>

    </div>

  );
};

export default Tasks;