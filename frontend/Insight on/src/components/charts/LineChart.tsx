// src/components/charts/LineChart.tsx
import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define props for the chart
interface LineChartProps {
  data: { x: string | number; y: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data = [] }) => {
  // Handle empty data safely
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-gray-500">
        No line chart data available
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="x" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;