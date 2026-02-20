type KpiGridProps = {
  data: Record<string, number>;
};

export default function KpiGrid({ data }: KpiGridProps) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400 capitalize">
            {key.replace(/_/g, " ")}
          </p>
          <p className="text-2xl font-bold text-white mt-1">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}