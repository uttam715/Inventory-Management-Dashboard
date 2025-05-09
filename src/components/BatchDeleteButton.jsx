import React from "react";

export default function BatchDeleteButton({ selectedIds, onDeleteBatch }) {
  return (
    <button
      disabled={selectedIds.length === 0}
      onClick={() => onDeleteBatch(selectedIds)}
      className={`px-4 py-2 rounded text-white font-semibold ${
        selectedIds.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      Delete Selected ({selectedIds.length})
    </button>
  );
}
