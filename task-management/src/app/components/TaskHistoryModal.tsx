import React from "react";
import { Dialog } from "@headlessui/react";

interface HistoryEntry {
    previousStatus: string;
    timestamp: string;
    changeReason: string;
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
                        {history?.length > 0 ? history.map((entry, index) => (
                            <li key={index} className="mb-2">
                                <p><strong>Status:</strong> {entry.previousStatus}</p>
                                <p><strong>Date:</strong> {entry.timestamp}</p>
                                <p><strong>Reason:</strong> {entry.changeReason}</p>
                            </li>
                        )) :
                            <p className="text-gray-500 text-center">No tasks available.</p>
                        }
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