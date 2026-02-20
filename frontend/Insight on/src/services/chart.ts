import apiClient from './api';
import { ChartConfigResponse } from '@/types/api';

export async function getChartConfig(filename: string): Promise<ChartConfigResponse> {
  const response = await apiClient.post<ChartConfigResponse>('/chart-config', { filename });
  return response.data;
}
