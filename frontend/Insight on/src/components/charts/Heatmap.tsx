export default function BarChart({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="h-48 bg-gray-800 animate-pulse rounded-xl" />
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold mb-2">Bar Chart</h3>
      <pre className="text-xs text-gray-400">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}