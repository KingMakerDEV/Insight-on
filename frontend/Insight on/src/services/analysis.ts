import api from "./api";

/**
 * Upload CSV / Excel dataset to backend
 */
export const uploadDataset = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Trigger backend analysis & get visualization-ready data
 */
export const analyzeDataset = async () => {
  const response = await api.post(
    "/analyze",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};