import React, { useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

const AddTask = () => {
    const { isAuthenticated } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/tasks", { title, description });
            router.push("/tasks");
        } catch (err) {
            console.error(err);
            alert("Failed to create task. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return <p>You must log in to add a task.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;