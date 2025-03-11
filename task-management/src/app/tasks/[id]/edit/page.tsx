"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import { toast } from 'react-toastify';

const EditTask = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const searchParams = useParams()
    const { id } = searchParams;

    console.log(id)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (id) {
            console.log(id);
            api.get(`/tasks/${id}`).then(({ data }) => {
                console.log(data.data);
                setTitle(data.data.task.title);
                setDescription(data.data.task.description);
                setStatus(data.data.task.status);
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.patch(`/tasks/${id}`, { title, description, status });
            toast.success("Task updated successfully!");
            router.push("/");

        } catch (err) {
            console.log(err);
            toast.error("Failed to update task. Please try again.");
            alert("Failed to update task. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return <p>You must log in to edit a task.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    />
                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    >
                        <option value="in-progress">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTask;