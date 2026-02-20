import { useState } from "react";
import { analyzeDataset } from "../services/analysis";

import KpiGrid from "../components/KPI/KpiGrid";
import FilterPanel from "../components/Filters/FilterPanel";
import BarChart from "../components/charts/BarChart";
import LineChart from '../components/charts/LineChart';
import ScatterPlot from "../components/charts/ScatterPlot";
import InsightPanel from "../components/InsightPanel";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateVisualization = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await analyzeDataset();
      setData(response);
    } catch (err) {``
      setError("Failed to generate visualizations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <button
          onClick={handleGenerateVisualization}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-sm font-medium"
        >
          {loading ? "Generating..." : "Generate Visualization"}
        </button>
      </div>

      {/* Filters */}
      <FilterPanel />

      {/* Error */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      {data && <KpiGrid data={data.kpis} />}

      {/* Charts */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">
              Category Distribution
            </h2>
            <BarChart data={data.barChart} />
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-2">Trend Over Time</h2>
            <LineChart data={data.lineChart} />
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Correlation</h2>
            <ScatterPlot data={data.scatterPlot} />
          </div>
        </div>
      )}

      {/* Insights */}
      {data && <InsightPanel insights={data.insights} />}
    </div>
  );
}