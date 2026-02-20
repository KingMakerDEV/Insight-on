import { useState } from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export default function FileUpload({ onUpload, loading = false }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ CSV validation
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are allowed");
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || loading) return;
    onUpload(selectedFile);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-gray-900 border border-gray-700 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Upload Dataset
      </h2>

      {/* File input */}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition">
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
        />
        <p className="text-gray-300">
          {selectedFile ? selectedFile.name : "Click to upload CSV file"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Only .csv files supported
        </p>
      </label>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-400 mt-2">
          {error}
        </p>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="mt-4 w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}