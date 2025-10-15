import React from 'react';

function TaskCard({ task, onDelete }) {
  return (
    <div className="flex justify-between items-center border p-2 mb-2 rounded bg-white shadow">
      <span>{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
