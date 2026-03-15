import { useState } from "react";
import Controls from "./components/Controls";
import ForecastChart from "./components/ForecastChart";
import StatsRow from "./components/StatsRow";
import type { WindData } from "./types/wind";
import { fetchWindData } from "./services/api";

function App() {
  const [data, setData] = useState<WindData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0);

  const loadData = async (start: Date, end: Date, horizon: number) => {
    try {
      setError(null);
      setLoading(true);

      const result = await fetchWindData(start, end, horizon);

      console.log({ result });

      setData(Array.isArray(result) ? result : []);
      setChartKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      setError("Unable to load wind forecast data. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header app-header--compact">
        <h1>Wind Generation — UK</h1>
        <p className="app-subtitle">Forecast accuracy monitor</p>
      </header>

      <main className="app-layout app-layout--stacked">
        <section className="panel panel-controls panel-controls--row">
          <Controls onChange={loadData} />
        </section>

        <section className="panel panel-chart">
          {data.length > 0 && (
            <div className="stats-row-wrap">
              <StatsRow data={data} />
            </div>
          )}

          {loading && (
            <div className="status-banner status-banner-loading">
              <span className="spinner" />
              <span>Fetching data…</span>
            </div>
          )}

          {error && (
            <div className="status-banner status-banner-error">{error}</div>
          )}

          <div className="chart-wrapper">
            <ForecastChart key={chartKey} data={data} />
          </div>

          <footer className="app-footer">
            Data: Elexon BMRS API
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
