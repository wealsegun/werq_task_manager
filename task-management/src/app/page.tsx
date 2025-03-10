"use client";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import TaskHistoryModal from "./components/TaskHistoryModal";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}


const Tasks = () => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState('')

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await api.get(`/tasks?status=${filter}&search=${search}`);
      setTasks(data);
    };
    fetchTasks();
  }, [filter, search, page]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (err) {
        console.log(err);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  const openModal = async (id: string) => {
    const { data } = await api.get(`/tasks/${id}/history`);
    setTaskHistory(data);
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
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border rounded">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => openModal(task.id)} className="text-blue-500 hover:underline">
              View History
            </button>
            <TaskHistoryModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              history={taskHistory}
            />
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
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