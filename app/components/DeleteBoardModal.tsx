"use client";

export default function DeleteBoardModal({
  boardName,
  onConfirm,
  onCancel,
}: {
  boardName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Are you sure you want to delete the board <strong>{boardName}</strong>?
        </h2>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
