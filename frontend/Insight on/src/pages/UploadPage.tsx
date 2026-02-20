import { useState } from "react";
import FileUpload from "../components/Fileupload";
import { uploadDataset } from "../services/analysis";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      await uploadDataset(file);
      alert("Upload successful!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <FileUpload onUpload={handleUpload} loading={loading} />
    </div>
  );
}