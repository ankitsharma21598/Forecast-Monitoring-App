import { useMemo } from "react";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import type { WindData } from "../types/wind";

interface Props {
  data: WindData[];
}

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const date = dayjs(payload.value);

  // Display date only for the first tick or if we could determine day change.
  // Since we don't easily have the full data array here, showing it on all might be safer,
  // but we can try to use the index to at least mark the start.
  // However, Recharts doesn't pass the full data to the tick component easily.
  // To keep it clean and match the visual, we'll keep the two-line format but maybe
  // the user prefers the cleaner look. Let's stick to the multi-line format for now
  // as it's very clear.
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        fontSize={12}
        className="recharts-text recharts-cartesian-axis-tick-value"
      >
        <tspan x="0" dy="1.2em" fontWeight="500">
          {date.format("HH:mm")}
        </tspan>
        <tspan x="0" dy="1.5em" fontSize={10} fill="#999">
          {date.format("DD/MM/YY")}
        </tspan>
      </text>
    </g>
  );
};

export default function ForecastChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="empty-state">
        <p>No data loaded yet.</p>
        <p className="empty-state-subtitle">
          Choose a date range and forecast horizon, then click{" "}
          <span className="empty-state-accent">Load data</span>.
        </p>
      </div>
    );
  }

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => dayjs(a.time).unix() - dayjs(b.time).unix(),
    );
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        data={sortedData}
        margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={true} />

        <XAxis
          dataKey="time"
          tick={<CustomXAxisTick />}
          interval="preserveStartEnd"
          minTickGap={50}
          label={{
            value: "Target Time End (UTC)",
            position: "bottom",
            offset: 40,
            fill: "#a9a9a9",
            fontSize: 15,
          }}
        />

        <YAxis
          tickFormatter={(value) => `${value / 1000}k`}
          label={{
            value: "Power (MW)",
            angle: -90,
            position: "insideLeft",
            offset: -10,
            fill: "#a9a9a9",
            fontSize: 15,
          }}
          domain={["auto", "auto"]}
        />

        <Tooltip
          labelFormatter={(label) => dayjs(label).format("DD MMM YYYY, HH:mm")}
          formatter={(value: any) => [`${Number(value).toFixed(0)} MW`]}
        />

        <Legend verticalAlign="top" height={36} />

        <Line
          type="monotone"
          dataKey="actual"
          stroke="#1d76b3"
          strokeWidth={2.5}
          dot={false}
          name="Actual Generation"
          activeDot={{ r: 6 }}
        />

        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#16a34a"
          strokeWidth={2.5}
          dot={false}
          name="Forecast Generation"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
