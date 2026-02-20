// src/components/InsightPanel.tsx
import React from "react";

export default function InsightPanel() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-white">
      <h3 className="text-lg font-semibold mb-2">Insights</h3>

      <ul className="text-sm text-gray-400 space-y-2">
        <li>• Upload a dataset to generate insights</li>
        <li>• Trends and anomalies will appear here</li>
        <li>• Forecasts will be shown once analysis is complete</li>
      </ul>
    </div>
  );
}