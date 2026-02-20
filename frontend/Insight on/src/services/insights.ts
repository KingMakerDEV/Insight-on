import apiClient from './api';
import { InsightsResponse } from '@/types/api';

export async function getInsights(filename: string): Promise<InsightsResponse> {
  const response = await apiClient.post<InsightsResponse>('/insights', { filename });
  return response.data;
}
