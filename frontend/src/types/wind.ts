export interface WindData {
  time: string
  actual: number
  forecast: number
}

export interface QueryParams {
  start: Date
  end: Date
  horizon: number
}