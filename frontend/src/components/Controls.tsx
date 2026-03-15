import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onChange: (start: Date, end: Date, horizon: number) => void;
}

export default function Controls({ onChange }: Props) {
  const [start, setStart] = useState(new Date("2024-01-01T00:00:00"));
  const [end, setEnd] = useState(new Date("2024-01-31T23:30:00"));
  const [horizon, setHorizon] = useState(4);

  const handleLoad = () => {
    console.log({ start });
    console.log({ end });

    onChange(start, end, horizon);
  };

  return (
    <div className="controls-grid">
      <div className="form-field">
        <label className="field-label">Start time</label>
        <DatePicker
          selected={start}
          onChange={(date: Date | null) => date && setStart(date)}
          showTimeSelect
          timeIntervals={30}
          dateFormat="dd/MM/yyyy HH:mm"
          className="input date-input"
          calendarClassName="datepicker-calendar"
        />
      </div>

      <div className="form-field">
        <label className="field-label">End time</label>
        <DatePicker
          selected={end}
          onChange={(date: Date | null) => date && setEnd(date)}
          showTimeSelect
          timeIntervals={30}
          dateFormat="dd/MM/yyyy HH:mm"
          className="input date-input"
          calendarClassName="datepicker-calendar"
        />
      </div>

      <div className="form-field form-field--horizon">
        <div className="field-label-row">
          <span className="field-label">Forecast horizon</span>
          <span className="field-label-value">{horizon}h</span>
        </div>
        <input
          type="range"
          min={0}
          max={48}
          value={horizon}
          onChange={(e) => setHorizon(Number(e.target.value))}
          className="range-input"
        />
        <div className="range-scale">
          <span>0h</span>
          <span>24h</span>
          <span>48h</span>
        </div>
      </div>

      <div className="controls-actions">
        <button className="button-primary" onClick={handleLoad}>
          Load data
        </button>
      </div>
    </div>
  );
}
