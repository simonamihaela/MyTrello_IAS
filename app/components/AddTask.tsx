"use client";

import { useState } from "react";
import { addTask } from "../actions";

export default function AddTask({ listId }: { listId: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit() {
    if (!title.trim()) return;
    await addTask(listId, title, desc);
    setOpen(false);
    setTitle("");
    setDesc("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-300 text-blue-900 px-10 py-1 rounded-lg hover:bg-blue-400 border border-blue-900"
      >
        + Add a card
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Add Task</h2>

            <input
              type="text"
              className="w-full border border-gray-500 rounded-lg px-3 py-2 mb-4 text-blue-900 placeholder-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

            <textarea
              className="w-full border border-gray-500 rounded-lg px-3 py-2 mb-4 text-blue-900 placeholder-gray-300"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter task description"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
