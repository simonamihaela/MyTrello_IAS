"use client";
import { useState } from "react";
import TaskModal from "./TaskModal";

export default function TaskCard({ task }: { task: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-lg p-3 shadow cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setOpen(true)}
      >
        <h3 className="font-medium text-gray-800">{task.title}</h3>
      </div>

      {open && (
        <TaskModal
          task={task}
          onClose={() => setOpen(false)}
          onUpdated={() => window.location.reload()}
          onDeleted={() => window.location.reload()}
        />
      )}
    </>
  );
}
