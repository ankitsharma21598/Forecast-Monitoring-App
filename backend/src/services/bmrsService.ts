import axios from "axios";

const BASE_URL = "https://data.elexon.co.uk/bmrs/api/v1";

/**
 * FUELHH stream: actual half-hourly generation by fuel type.
 * Uses settlementDateFrom/settlementDateTo (YYYY-MM-DD) to avoid the stream's
 * buggy startTime/endTime ISO parser.
 */
export const getActualGeneration = async (
  start: string,
  end: string,
): Promise<{ startTime: string; generation: number }[]> => {
  const chunkStartDate = start.slice(0, 10);
  const chunkEndDate = end.slice(0, 10);

  const url = `${BASE_URL}/datasets/FUELHH/stream?settlementDateFrom=${chunkStartDate}&settlementDateTo=${chunkEndDate}&fuelType=WIND`;

  const response =
    await axios.get<
      { startTime: string; publishTime: string; generation: number }[]
    >(url);

  const raw = Array.isArray(response.data) ? response.data : [];
  // One row per startTime: keep the latest publishTime (final outturn)
  const byStart = new Map<
    string,
    { startTime: string; publishTime: string; generation: number }
  >();
  for (const row of raw) {
    const existing = byStart.get(row.startTime);
    if (
      !existing ||
      new Date(row.publishTime) > new Date(existing.publishTime)
    ) {
      byStart.set(row.startTime, {
        startTime: row.startTime,
        publishTime: row.publishTime,
        generation: row.generation,
      });
    }
  }
  return Array.from(byStart.values()).map(({ startTime, generation }) => ({
    startTime,
    generation,
  }));
};

/**
 * WINDFOR stream: wind generation forecasts.
 * Uses publishDateTimeFrom/publishDateTimeTo (ISO). Optionally extends the from
 * time backwards by 48h so forecasts published before the window start are
 * available for horizon matching.
 */
export const getForecastGeneration = async (
  start: string,
  end: string,
): Promise<
  { startTime: string; publishTime: string; generation: number }[]
> => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const fromDate = new Date(startDate.getTime() - 48 * 60 * 60 * 1000);

  const chunkStart = fromDate.toISOString();
  const chunkEnd = endDate.toISOString();

  const url = `${BASE_URL}/datasets/WINDFOR/stream?publishDateTimeFrom=${encodeURIComponent(chunkStart)}&publishDateTimeTo=${encodeURIComponent(chunkEnd)}`;

  const response =
    await axios.get<
      { startTime: string; publishTime: string; generation: number }[]
    >(url);

  const data = Array.isArray(response.data) ? response.data : [];
  return data;
};
