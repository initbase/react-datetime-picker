import React, { useState } from "react";
import { Popover } from "./Popover";
import { TimeColumn } from "./TimeColumn";
import { InputTrigger } from "./InputTrigger";
import { useControlled } from "./hooks";
import { formatTimeValue, isTimeDisabled, clampDate } from "./utils";
import type { TimePickerProps, DateValue } from "./types";

export function TimePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  locale = "en-US",
  className = "",
  style,
  placeholder = "Select time",
  position,
  step = 1,
  showSeconds = false,
  timeFormat = "24h",
  min,
  max,
}: TimePickerProps) {
  const [value, setValue] = useControlled<DateValue>(controlledValue, defaultValue ?? null, onChange);
  const [open, setOpen] = useState(false);

  const handleHourChange = (hour: number) => {
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hour);
    const clamped = clampDate(newDate, min, max);
    setValue(clamped);
  };

  const handleMinuteChange = (minute: number) => {
    const newDate = value ? new Date(value) : new Date();
    newDate.setMinutes(minute);
    const clamped = clampDate(newDate, min, max);
    setValue(clamped);
  };

  const handleSecondChange = (second: number) => {
    const newDate = value ? new Date(value) : new Date();
    newDate.setSeconds(second);
    const clamped = clampDate(newDate, min, max);
    setValue(clamped);
  };

  const displayValue = value ? formatTimeValue(value, locale, showSeconds) : "";
  const current = value ?? new Date();

  const formatHour = (h: number) => {
    if (timeFormat === "12h") {
      const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${display} ${h < 12 ? "AM" : "PM"}`;
    }
    return String(h).padStart(2, "0");
  };

  return (
    <InputTrigger
      displayValue={displayValue}
      placeholder={placeholder}
      className={className}
      style={style}
      onClick={() => setOpen((o) => !o)}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Popover open={open} onClose={() => setOpen(false)} position={position}>
        <div className="rdp-time-picker">
          <TimeColumn
            count={24}
            step={1}
            value={current.getHours()}
            onChange={handleHourChange}
            label="Hour"
            formatValue={formatHour}
          />
          <TimeColumn
            count={60}
            step={step}
            value={current.getMinutes()}
            onChange={handleMinuteChange}
            label="Minute"
          />
          {showSeconds && (
            <TimeColumn
              count={60}
              step={1}
              value={current.getSeconds()}
              onChange={handleSecondChange}
              label="Second"
            />
          )}
        </div>
      </Popover>
    </InputTrigger>
  );
}
