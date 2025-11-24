"use client";

import { useState } from "react";
import { addList } from "..//actions";
import posthog from 'posthog-js';

export default function AddList({ boardId }: { boardId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit() {
    if (!name.trim()) return;
    await addList(boardId, name);
    setOpen(false);
    setName("");

    posthog.capture('Add new list');
    console.log('Add new list event tracked');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-800 text-white px-10 py-2 rounded-lg hover:bg-blue-900"
      >
        + Add a list
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Add List</h2>

            <input
              type="text"
              className="w-full border border-gray-500 rounded-lg px-3 py-2 mb-4 text-blue-900 placeholder-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list name"
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
