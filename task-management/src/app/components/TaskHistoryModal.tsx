import React from "react";
import { Dialog } from "@headlessui/react";

interface HistoryEntry {
    status: string;
    date: string;
    reason: string;
}

interface TaskHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: HistoryEntry[];
}

const TaskHistoryModal: React.FC<TaskHistoryModalProps> = ({ isOpen, onClose, history }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Panel className="bg-white rounded p-6 shadow-lg w-full max-w-md">
                    <Dialog.Title className="text-xl font-bold mb-4">Task History</Dialog.Title>
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index} className="mb-2">
                                <p><strong>Status:</strong> {entry.status}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Reason:</strong> {entry.reason}</p>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default TaskHistoryModal;