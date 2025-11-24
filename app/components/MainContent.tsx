"use client";

import { useState } from "react";
import AddBoardModal from "./AddBoardModal";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import { addBoard, editBoard, deleteBoard } from "@/app/actions";
import posthog from 'posthog-js';

export default function MainContent({ boards }: { boards: any[] }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<{ id: string; name: string } | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string; name: string } | null>(null);

  async function handleAdd(name: string) {
    posthog.capture('Add Board');
    console.log('Add Board event tracked');

    await addBoard(name);
    setOpenAdd(false);
  }

  async function handleEdit(newName: string) {
    if (!editData) return;
    await editBoard(editData.id, newName);
    setOpenEdit(false);
  }

  async function handleDeleteConfirm() {
    if (!deleteData) return;
    await deleteBoard(deleteData.id);
    setOpenDelete(false);
  }

  return (
    <div>
      {/* Add board button */}
      <button
        onClick={() => setOpenAdd(true)}
        className="inline-block mt-6 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition"
      >
        Add new board
      </button>

      {/* Add board modal */}
      {openAdd && (
        <AddBoardModal
          onSave={handleAdd}
          onCancel={() => setOpenAdd(false)}
        />
      )}

      {/* Edit board modal */}
      {openEdit && editData && (
        <EditBoardModal
          initialName={editData.name}
          onSave={handleEdit}
          onCancel={() => setOpenEdit(false)}
        />
      )}

      {/* Delete board confirmation modal */}
      {openDelete && deleteData && (
        <DeleteBoardModal
          boardName={deleteData.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setOpenDelete(false)}
        />
      )}

      {/* Boards Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boards.map((board: any) => (
          <div
            key={board._id}
            className="bg-blue-300 p-6 rounded-xl shadow border border-black flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-900">{board.name}</h2>

            <div className="flex justify-between mt-auto">
              <div>
                <button 
                    onClick={() => window.location.href = `/board/${board._id}`}
                    className="px-3 py-2 text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-900">
                  View details
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                    onClick={() => {
                    setEditData({ id: board._id, name: board.name });
                    setOpenEdit(true);
                    }}
                    className="px-2 py-2 text-sm border border-black-500 text-white rounded-lg hover:bg-gray-200"
                >
                    ✏️
                </button>

                <button
                    onClick={() => {
                      setDeleteData({ id: board._id, name: board.name });
                      setOpenDelete(true);
                    }}
                    className="px-2 py-2 text-sm border border-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
