import type { WindData } from "../types/wind";

interface Props {
  data: WindData[];
}

export default function StatsRow({ data }: Props) {
  const withForecast = data.filter(
    (d) =>
      typeof d.actual === "number" && typeof d.forecast === "number"
  );

  let mae = 0;
  let rmse = 0;
  let bias = 0;
  let coverage = 0;

  if (data.length > 0) {
    coverage = Math.round((withForecast.length / data.length) * 100);

    if (withForecast.length > 0) {
      const sumAbs = withForecast.reduce(
        (acc, d) => acc + Math.abs(d.forecast - d.actual),
        0
      );
      const sumSq = withForecast.reduce(
        (acc, d) => acc + (d.forecast - d.actual) ** 2,
        0
      );
      const sumBias = withForecast.reduce(
        (acc, d) => acc + (d.forecast - d.actual),
        0
      );

      mae = Math.round(sumAbs / withForecast.length);
      rmse = Math.round(Math.sqrt(sumSq / withForecast.length));
      bias = Math.round(sumBias / withForecast.length);
    }
  }

  const formatVal = (v: number) =>
    new Intl.NumberFormat("en-GB").format(v);

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-label">MAE</span>
        <span className="stat-value">{formatVal(mae)} MW</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">RMSE</span>
        <span className="stat-value">{formatVal(rmse)} MW</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Bias</span>
        <span className="stat-value">
          {bias > 0 ? "+" : ""}
          {formatVal(bias)} MW
        </span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Coverage</span>
        <span className="stat-value">{coverage} %</span>
      </div>
    </div>
  );
}
