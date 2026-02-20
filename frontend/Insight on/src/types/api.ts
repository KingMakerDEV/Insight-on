export interface UploadResponse {
  filename: string
  rows: number
  columns: string[]
}

export interface AnalyzeResponse {
  stats: Record<string, any>
}

export interface ChartConfigResponse {
  chart_type: string
  x_axis: string
  y_axis: string
  aggregation: string
  data: Record<string, unknown>[]
}

export interface InsightsResponse {
  ai_insight: {
    dataset_profile: string
    executive_insight: string
  }
}