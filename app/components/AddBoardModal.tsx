"use client";

import { useState } from "react";

export default function AddBoardModal({
  onSave,
  onCancel
}: {
  onSave: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
        
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Add new board</h2>

        <input
          type="text"
          placeholder="Enter board name"
          className="w-full border border-gray-500 rounded-lg px-3 py-2 mb-4 text-blue-900 placeholder-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave(name);
              setName("");
            }}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
