"use client";

import { useState } from "react";
import { updateTask, deleteTask } from "../actions";

export default function TaskModal({ task, onClose }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  async function handleSave() {
    await updateTask(task._id, title, description);
    setIsEditing(false);
  }

  async function handleDelete() {
    await deleteTask(task._id);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
        {!isEditing ? (
          <h2 className="text-xl font-semibold mb-4 text-blue-900">{title}</h2>
        ) : (
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-blue-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        {!isEditing ? (
          <p className="text-gray-700"><strong>Description</strong>: {description}</p>
        ) : (
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-blue-900"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                Delete task
            </button>

            <div className="flex justify-end gap-2">
            {!isEditing ? (
                <>
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                >
                    Edit
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
                >
                    Close
                </button>
                </>
            ) : (
                <>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                >
                    Save
                </button>
                <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
                >
                    Cancel
                </button>
                </>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}
