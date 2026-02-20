import { useState } from "react";
import { analyzeDataset } from "../services/analysis";

export function useAnalysis() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await analyzeDataset();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, generate };
}