import { useState } from "react";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  TimeRangePicker,
  DateTimeRangePicker,
} from "@initbase/react-datetime-picker";
import "@initbase/react-datetime-picker/datetime-picker.css";

const code1 = `// Custom styled button with custom date format
<DatePicker
  renderTrigger={({ onClick, value, open }) => (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        background: open ? "#e0e7ff" : "#fff",
        border: "2px solid #6366f1",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        color: "#4338ca",
        fontWeight: 500,
        width: "100%",
      }}
    >
      {value
        ? value.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Choose a date"}
    </button>
  )}
/>`;

const code2 = `// Custom range chips with short month format
<DateRangePicker
  renderTrigger={({ onClick, value, open }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        background: open ? "#fef3c7" : "#fff",
        border: "2px solid #f59e0b",
        borderRadius: 20,
        cursor: "pointer",
        fontSize: 13,
        color: "#92400e",
        width: "100%",
      }}
    >
      <span>{value[0]?.toLocaleDateString("en-GB") ?? "Start"}</span>
      <span style={{ color: "#d97706" }}>→</span>
      <span>{value[1]?.toLocaleDateString("en-GB") ?? "End"}</span>
    </div>
  )}
/>`;

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [timeRange, setTimeRange] = useState<[Date | null, Date | null]>([null, null]);
  const [dateTimeRange, setDateTimeRange] = useState<[Date | null, Date | null]>([null, null]);
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div style={{ maxWidth: 580, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>@initbase/react-datetime-picker</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>DatePicker</h2>
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>TimePicker</h2>
        <TimePicker value={time} onChange={setTime} placeholder="Pick a time" step={15} />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>DateTimePicker</h2>
        <DateTimePicker value={dateTime} onChange={setDateTime} placeholder="Pick date &amp; time" />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>DateRangePicker</h2>
        <DateRangePicker
          value={dateRange as [Date | null, Date | null]}
          onChange={setDateRange}
          placeholder={["Start date", "End date"]}
        />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>TimeRangePicker</h2>
        <TimeRangePicker
          value={timeRange as [Date | null, Date | null]}
          onChange={setTimeRange}
          placeholder={["Start time", "End time"]}
          step={15}
        />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>DateTimeRangePicker</h2>
        <DateTimeRangePicker
          value={dateTimeRange as [Date | null, Date | null]}
          onChange={setDateTimeRange}
          placeholder={["Start date &amp; time", "End date &amp; time"]}
        />
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Custom Trigger — DatePicker</h2>
        <DatePicker
          value={customDate}
          onChange={setCustomDate}
          renderTrigger={({ onClick, value, open }) => (
            <button
              onClick={onClick}
              style={{
                padding: "10px 16px",
                background: open ? "#e0e7ff" : "#fff",
                border: "2px solid #6366f1",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                color: "#4338ca",
                fontWeight: 500,
                width: "100%",
              }}
            >
              {value
                ? value.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Choose a date"}
            </button>
          )}
        />
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "#6b7280" }}>Show code</summary>
          <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto" }}><code>{code1}</code></pre>
        </details>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Custom Trigger — DateRangePicker</h2>
        <DateRangePicker
          value={customRange as [Date | null, Date | null]}
          onChange={setCustomRange}
          renderTrigger={({ onClick, value, open }) => (
            <div
              onClick={onClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                background: open ? "#fef3c7" : "#fff",
                border: "2px solid #f59e0b",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 13,
                color: "#92400e",
                width: "100%",
              }}
            >
              <span>{value[0]?.toLocaleDateString("en-GB") ?? "Start"}</span>
              <span style={{ color: "#d97706" }}>→</span>
              <span>{value[1]?.toLocaleDateString("en-GB") ?? "End"}</span>
            </div>
          )}
        />
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "#6b7280" }}>Show code</summary>
          <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto" }}><code>{code2}</code></pre>
        </details>
      </section>
    </div>
  );
}

export default App;
