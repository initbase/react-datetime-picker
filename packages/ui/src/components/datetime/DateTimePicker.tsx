import React, { useState } from "react";
import { Popover } from "./Popover";
import { Calendar } from "./Calendar";
import { TimeColumn } from "./TimeColumn";
import { InputTrigger } from "./InputTrigger";
import { useControlled } from "./hooks";
import { clampDate, formatDateTimeValue } from "./utils";
import type { DateTimePickerProps, DateValue } from "./types";

export function DateTimePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  locale = "en-US",
  className = "",
  style,
  placeholder = "Select date & time",
  step = 1,
  showSeconds = false,
  timeFormat = "24h",
  min,
  max,
}: DateTimePickerProps) {
  const [value, setValue] = useControlled<DateValue>(controlledValue, defaultValue ?? null, onChange);
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  const handleDateSelect = (date: Date) => {
    const current = value ? new Date(value) : new Date();
    const newDate = new Date(date);
    newDate.setHours(current.getHours(), current.getMinutes(), current.getSeconds());
    setValue(clampDate(newDate, min, max));
  };

  const handleHourChange = (hour: number) => {
    const current = value ? new Date(value) : new Date();
    current.setHours(hour);
    setValue(clampDate(current, min, max));
  };

  const handleMinuteChange = (minute: number) => {
    const current = value ? new Date(value) : new Date();
    current.setMinutes(minute);
    setValue(clampDate(current, min, max));
  };

  const handleSecondChange = (second: number) => {
    const current = value ? new Date(value) : new Date();
    current.setSeconds(second);
    setValue(clampDate(current, min, max));
  };

  const handleClose = () => {
    setOpen(false);
    setShowCalendar(true);
  };

  const displayValue = value ? formatDateTimeValue(value, locale, showSeconds) : "";
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
      onClose={handleClose}
    >
      <Popover open={open} onClose={handleClose} style={{ minWidth: 340 }}>
        <div className="rdp-datetime-layout">
          <Calendar
            value={value}
            onSelect={handleDateSelect}
            min={min}
            max={max}
            defaultMonth={value ?? undefined}
          />
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
        </div>
      </Popover>
    </InputTrigger>
  );
}
