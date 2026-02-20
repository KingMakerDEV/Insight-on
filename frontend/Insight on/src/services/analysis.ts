import apiClient from './api';
import { AnalyzeResponse } from '@/types/api';

export async function analyzeDataset(filename: string): Promise<AnalyzeResponse> {
  const response = await apiClient.post<AnalyzeResponse>('/analyze', { filename });
  return response.data;
}
