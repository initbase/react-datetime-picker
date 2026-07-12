import React, { useState } from "react";
import { Popover } from "./Popover";
import { Calendar } from "./Calendar";
import { InputTrigger } from "./InputTrigger";
import { useControlled } from "./hooks";
import { clampDate, formatDateValue } from "./utils";
import type { DatePickerProps, DateValue } from "./types";

export function DatePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  locale = "en-US",
  className = "",
  style,
  placeholder = "Select date",
  min,
  max,
}: DatePickerProps) {
  const [value, setValue] = useControlled<DateValue>(controlledValue, defaultValue ?? null, onChange);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date) => {
    const clamped = clampDate(date, min, max);
    setValue(clamped);
    setOpen(false);
  };

  const displayValue = value ? formatDateValue(value, locale) : "";

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
      <Popover open={open} onClose={() => setOpen(false)}>
        <Calendar
          value={value}
          onSelect={handleSelect}
          min={min}
          max={max}
          defaultMonth={value ?? undefined}
        />
      </Popover>
    </InputTrigger>
  );
}
