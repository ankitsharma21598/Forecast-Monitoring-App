export interface ActualGeneration {
  startTime: string;
  generation: number;
}

export interface ForecastGeneration {
  startTime: string;
  publishTime: string;
  generation: number;
}

export interface WindResponse {
  time: string;
  actual: number;
  forecast: number;
  error: number;
}
