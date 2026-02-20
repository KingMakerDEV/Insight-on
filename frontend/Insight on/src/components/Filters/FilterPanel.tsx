// src/components/Filters/FilterPanel.tsx
import React from "react";

export default function FilterPanel() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-white">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="flex flex-col gap-3">
        <select className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm">
          <option>All Categories</option>
          <option>Category A</option>
          <option>Category B</option>
        </select>

        <input
          type="date"
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}