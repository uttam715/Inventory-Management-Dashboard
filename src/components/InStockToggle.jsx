import React from "react";

const stockOptions = ["All", "In Stock", "Out of Stock"];

export default function InStockToggle({ selected, onChange }) {
  return (
    <div className="flex gap-2">
      {stockOptions.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded border font-medium transition ${
            selected === option
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
