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

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [timeRange, setTimeRange] = useState<[Date | null, Date | null]>([null, null]);
  const [dateTimeRange, setDateTimeRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
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
    </div>
  );
}

export default App;
