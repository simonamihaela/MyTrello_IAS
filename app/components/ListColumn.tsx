"use client";

import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useState } from "react";
import { updateListName, deleteListAndTasks } from "../actions";

export default function ListColumn({ list }: { list: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(list.name);

  async function handleSave() {
    await updateListName(list._id, name);
    setIsEditing(false);
  }

  async function handleDelete() {
    await deleteListAndTasks(list._id);
  }
  
  return (
    <div className="bg-gray-100 w-64 p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        {!isEditing ? (
          <h2 className="font-semibold text-blue-800">{name}</h2>
        ) : (
          <input
            className="w-full border border-gray-300 rounded px-2 py-1 text-blue-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <div className="flex items-center gap-1 ml-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg hover:bg-gray-200 text-sm px-1 py-1"
              >
                ✏️
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg hover:bg-red-200 text-sm px-1 py-1"
              >
                🗑️
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="rounded-lg hover:bg-green-200 text-sm px-1 py-1"
              >
                ✅
              </button>

              <button
                onClick={() => {
                  setName(list.name);
                  setIsEditing(false);
                }}
                className="rounded-lg hover:bg-red-200 text-sm px-1 py-1"
              >
                ❌
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {(list.tasks ?? []).map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}

        <AddTask listId={list._id} />
      </div>
    </div>
  );
}
