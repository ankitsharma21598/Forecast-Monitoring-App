import dayjs from "dayjs";
import type { WindResponse } from "../types/windTypes";

export const processForecastData = (
  actuals: any[],
  forecasts: any[],
  horizon: number,
): WindResponse[] => {
  const result: WindResponse[] = [];

  // console.log("actuals", actuals);
  // console.log("forecasts", forecasts);

  for (const actual of actuals) {
    const targetTime = dayjs(actual.startTime);
    const horizonTime = targetTime.subtract(horizon, "hour");

    // Primary: match same delivery slot and published at least `horizon` hours before
    let matchingForecasts = forecasts.filter((f) => {
      const publish = dayjs(f.publishTime);
      const start = dayjs(f.startTime);

      // Use minute precision to avoid millisecond / timezone mismatch
      const sameSlot = start.isSame(targetTime, "minute");
      const withinHorizon = publish.isBefore(horizonTime);

      return sameSlot && withinHorizon;
    });

    // Fallback: if nothing passes the horizon filter, at least use
    // the latest forecast for that delivery slot.
    if (matchingForecasts.length === 0) {
      matchingForecasts = forecasts.filter((f) => {
        const start = dayjs(f.startTime);
        return start.isSame(targetTime, "minute");
      });
    }

    if (matchingForecasts.length === 0) continue;

    const latestForecast = matchingForecasts.reduce((prev, curr) => {
      return dayjs(curr.publishTime).isAfter(dayjs(prev.publishTime))
        ? curr
        : prev;
    });

    result.push({
      time: actual.startTime,
      actual: actual.generation,
      forecast: latestForecast.generation,
      error: latestForecast.generation - actual.generation,
    });
  }

  return result;
};
