import React, { useState } from "react";
import { Popover } from "./Popover";
import { TimeColumn } from "./TimeColumn";
import { RangeInputTrigger } from "./InputTrigger";
import { formatTimeValue, clampDate } from "./utils";
import type { TimeRangePickerProps, DateRangeValue } from "./types";

export function TimeRangePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  locale = "en-US",
  className = "",
  style,
  placeholder,
  position,
  step = 1,
  showSeconds = false,
  timeFormat = "24h",
  min,
  max,
}: TimeRangePickerProps) {
  const [range, setRange] = useState<DateRangeValue>(
    controlledValue ?? defaultValue ?? [null, null]
  );
  const [open, setOpen] = useState(false);

  const isControlled = controlledValue !== undefined;
  const currentRange = isControlled ? controlledValue : range;

  const emit = (newRange: DateRangeValue) => {
    if (!isControlled) setRange(newRange);
    onChange?.(newRange);
  };

  const getStart = (): Date => {
    const d = currentRange[0] ? new Date(currentRange[0]) : new Date();
    d.setSeconds(0, 0);
    return d;
  };

  const getEnd = (): Date => {
    const d = currentRange[1] ? new Date(currentRange[1]) : new Date();
    d.setHours(23, 0, 0, 0);
    return d;
  };

  const updateStartTime = (hours: number, minutes: number, seconds: number = 0) => {
    const start = getStart();
    start.setHours(hours, minutes, seconds);
    emit([clampDate(start, min, max), currentRange[1]]);
  };

  const updateEndTime = (hours: number, minutes: number, seconds: number = 0) => {
    const end = getEnd();
    end.setHours(hours, minutes, seconds);
    emit([currentRange[0], clampDate(end, min, max)]);
  };

  const displayValues: [string, string] = [
    currentRange[0] ? formatTimeValue(currentRange[0], locale, showSeconds) : "",
    currentRange[1] ? formatTimeValue(currentRange[1], locale, showSeconds) : "",
  ];

  const start = getStart();
  const end = getEnd();

  const formatHour = (h: number) => {
    if (timeFormat === "12h") {
      const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${display} ${h < 12 ? "AM" : "PM"}`;
    }
    return String(h).padStart(2, "0");
  };

  return (
    <RangeInputTrigger
      displayValues={displayValues}
      placeholder={placeholder ?? ["Start time", "End time"]}
      className={className}
      style={style}
      onClick={() => setOpen((o) => !o)}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Popover open={open} onClose={() => setOpen(false)} position={position}>
        <div style={{ display: "flex", gap: 16 }}>
          <div className="rdp-datetime-range-panel">
            <div className="rdp-datetime-range-label">Start</div>
            <div className="rdp-time-picker">
              <TimeColumn
                count={24}
                step={1}
                value={start.getHours()}
                onChange={(h) => updateStartTime(h, start.getMinutes(), start.getSeconds())}
                label="Hour"
                formatValue={formatHour}
              />
              <TimeColumn
                count={60}
                step={step}
                value={start.getMinutes()}
                onChange={(m) => updateStartTime(start.getHours(), m, start.getSeconds())}
                label="Minute"
              />
              {showSeconds && (
                <TimeColumn
                  count={60}
                  step={1}
                  value={start.getSeconds()}
                  onChange={(s) => updateStartTime(start.getHours(), start.getMinutes(), s)}
                  label="Second"
                />
              )}
            </div>
          </div>
          <div className="rdp-datetime-range-panel">
            <div className="rdp-datetime-range-label">End</div>
            <div className="rdp-time-picker">
              <TimeColumn
                count={24}
                step={1}
                value={end.getHours()}
                onChange={(h) => updateEndTime(h, end.getMinutes(), end.getSeconds())}
                label="Hour"
                formatValue={formatHour}
              />
              <TimeColumn
                count={60}
                step={step}
                value={end.getMinutes()}
                onChange={(m) => updateEndTime(end.getHours(), m, end.getSeconds())}
                label="Minute"
              />
              {showSeconds && (
                <TimeColumn
                  count={60}
                  step={1}
                  value={end.getSeconds()}
                  onChange={(s) => updateEndTime(end.getHours(), end.getMinutes(), s)}
                  label="Second"
                />
              )}
            </div>
          </div>
        </div>
      </Popover>
    </RangeInputTrigger>
  );
}
