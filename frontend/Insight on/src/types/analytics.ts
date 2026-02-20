export interface StatSummary {
  column: string
  mean?: number
  median?: number
  std?: number
  min?: number
  max?: number
  count?: number
}

export interface KpiStat {
  label: string
  value: string | number
  change?: number
}