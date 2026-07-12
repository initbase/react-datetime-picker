import { useState } from "react";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  TimeRangePicker,
  DateTimeRangePicker,
} from "@initbase/react-datetime-picker";
import "./App.css";
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

const code3 = `// Green theme via inline style prop
<DatePicker
  style={{
    "--rdp-primary": "#059669",
    "--rdp-primary-hover": "#047857",
    "--rdp-primary-light": "#d1fae5",
    "--rdp-range-bg": "#d1fae5",
  } as React.CSSProperties}
/>`;

const code4 = `// Squared cells + red theme via className + style
<DatePicker
  className="demo-squared"
  style={{
    "--rdp-primary": "#dc2626",
    "--rdp-primary-hover": "#b91c1c",
    "--rdp-primary-light": "#fee2e2",
    "--rdp-range-bg": "#fee2e2",
    "--rdp-bg": "#fef2f2",
  } as React.CSSProperties}
/>`;

const code5 = `// Chinese locale with zh-CN
<DatePicker locale="zh-CN" />
<DateRangePicker locale="zh-CN" />`;

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [timeRange, setTimeRange] = useState<[Date | null, Date | null]>([null, null]);
  const [dateTimeRange, setDateTimeRange] = useState<[Date | null, Date | null]>([null, null]);
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([null, null]);
  const [greenDate, setGreenDate] = useState<Date | null>(null);
  const [squaredDate, setSquaredDate] = useState<Date | null>(null);
  const [zhDate, setZhDate] = useState<Date | null>(null);
  const [zhRange, setZhRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div style={{ maxWidth: 580, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>@initbase/react-datetime-picker</h1>

      <nav className="demo-toc">
        <span className="demo-toc-title">Sections</span>
        <div className="demo-toc-links">
          <span className="demo-toc-group">Pickers</span>
          <a href="#datepicker">DatePicker</a>
          <a href="#timepicker">TimePicker</a>
          <a href="#datetimepicker">DateTimePicker</a>
          <a href="#daterangepicker">DateRangePicker</a>
          <a href="#timerangepicker">TimeRangePicker</a>
          <a href="#datetimerangepicker">DateTimeRangePicker</a>

          <span className="demo-toc-group">Custom Trigger</span>
          <a href="#custom-trigger-date">DatePicker with custom button</a>
          <a href="#custom-trigger-range">DateRangePicker with custom chips</a>

          <span className="demo-toc-group">Custom Styling</span>
          <a href="#custom-style-green">Green theme (inline)</a>
          <a href="#custom-style-squared">Squared shape (className)</a>

          <span className="demo-toc-group">Locale</span>
          <a href="#locale-zh">Chinese (zh-CN)</a>

          <span className="demo-toc-group">Links</span>
          <a href="/">Docs</a>
          <a className="demo-support" href="https://ko-fi.com/burhanahmeed">Support ❤️</a>
        </div>
      </nav>

      <section id="datepicker" style={{ marginBottom: 24 }}>
        <h2>DatePicker</h2>
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
      </section>

      <section id="timepicker" style={{ marginBottom: 24 }}>
        <h2>TimePicker</h2>
        <TimePicker value={time} onChange={setTime} placeholder="Pick a time" step={15} />
      </section>

      <section id="datetimepicker" style={{ marginBottom: 24 }}>
        <h2>DateTimePicker</h2>
        <DateTimePicker value={dateTime} onChange={setDateTime} placeholder="Pick date &amp; time" />
      </section>

      <section id="daterangepicker" style={{ marginBottom: 24 }}>
        <h2>DateRangePicker</h2>
        <DateRangePicker
          value={dateRange as [Date | null, Date | null]}
          onChange={setDateRange}
          placeholder={["Start date", "End date"]}
        />
      </section>

      <section id="timerangepicker" style={{ marginBottom: 24 }}>
        <h2>TimeRangePicker</h2>
        <TimeRangePicker
          value={timeRange as [Date | null, Date | null]}
          onChange={setTimeRange}
          placeholder={["Start time", "End time"]}
          step={15}
        />
      </section>

      <section id="datetimerangepicker" style={{ marginBottom: 24 }}>
        <h2>DateTimeRangePicker</h2>
        <DateTimeRangePicker
          value={dateTimeRange as [Date | null, Date | null]}
          onChange={setDateTimeRange}
          placeholder={["Start date &amp; time", "End date &amp; time"]}
        />
      </section>

      <section id="custom-trigger-date" style={{ marginBottom: 24 }}>
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

      <section id="custom-trigger-range" style={{ marginBottom: 24 }}>
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

      <section id="custom-style-green" style={{ marginBottom: 24 }}>
        <h2>Custom Style — Green Theme (inline)</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 10px" }}>
          Override <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>--rdp-*</code> custom properties via the <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>style</code> prop. No CSS file needed.
        </p>
        <DatePicker
          value={greenDate}
          onChange={setGreenDate}
          style={{
            "--rdp-primary": "#059669",
            "--rdp-primary-hover": "#047857",
            "--rdp-primary-light": "#d1fae5",
            "--rdp-range-bg": "#d1fae5",
          } as React.CSSProperties}
        />
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "#6b7280" }}>Show code</summary>
          <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto" }}><code>{code3}</code></pre>
        </details>
      </section>

      <section id="custom-style-squared" style={{ marginBottom: 24 }}>
        <h2>Custom Style — Squared Shape (className)</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 10px" }}>
          Add a <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>className</code> and target internal classes like <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>.rdp-calendar-day</code> to change shapes.
        </p>
        <DatePicker
          value={squaredDate}
          onChange={setSquaredDate}
          className="demo-squared"
          style={{
            "--rdp-primary": "#dc2626",
            "--rdp-primary-hover": "#b91c1c",
            "--rdp-primary-light": "#fee2e2",
            "--rdp-range-bg": "#fee2e2",
            "--rdp-bg": "#fef2f2",
          } as React.CSSProperties}
        />
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "#6b7280" }}>Show code</summary>
          <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto" }}><code>{code4}</code></pre>
        </details>
      </section>

      <section id="locale-zh" style={{ marginBottom: 24 }}>
        <h2>Locale — Chinese (zh-CN)</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 10px" }}>
          Pass <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4 }}>locale="zh-CN"</code> for Chinese month/weekday labels and date formatting.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DatePicker
            value={zhDate}
            onChange={setZhDate}
            locale="zh-CN"
            placeholder="选择日期"
          />
          <DateRangePicker
            value={zhRange as [Date | null, Date | null]}
            onChange={setZhRange}
            locale="zh-CN"
            placeholder={["开始日期", "结束日期"]}
          />
        </div>
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "#6b7280" }}>Show code</summary>
          <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, fontSize: 12, overflowX: "auto" }}><code>{code5}</code></pre>
        </details>
      </section>
    </div>
  );
}

export default App;
