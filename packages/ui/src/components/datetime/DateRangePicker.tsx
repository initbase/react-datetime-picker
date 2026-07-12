import React, { useState, useCallback } from "react";
import { Popover } from "./Popover";
import { Calendar } from "./Calendar";
import { RangeInputTrigger } from "./InputTrigger";
import { clampDate, formatDateValue } from "./utils";
import type { DateRangePickerProps, DateRangeValue, DateValue } from "./types";

export function DateRangePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  locale = "en-US",
  className = "",
  style,
  placeholder,
  min,
  max,
}: DateRangePickerProps) {
  const [range, setRange] = useState<DateRangeValue>(
    controlledValue ?? defaultValue ?? [null, null]
  );
  const [open, setOpen] = useState(false);
  const [pendingStart, setPendingStart] = useState<Date | null>(null);

  const isControlled = controlledValue !== undefined;
  const currentRange = isControlled ? controlledValue : range;

  const emit = (newRange: DateRangeValue) => {
    if (!isControlled) setRange(newRange);
    onChange?.(newRange);
  };

  const handleSelect = useCallback(
    (date: Date) => {
      const clamped = clampDate(date, min, max);

      if (!pendingStart) {
        setPendingStart(clamped);
        emit([clamped, null]);
      } else {
        if (clamped.getTime() < pendingStart.getTime()) {
          emit([clamped, pendingStart]);
        } else {
          emit([pendingStart, clamped]);
        }
        setPendingStart(null);
        setOpen(false);
      }
    },
    [pendingStart, min, max, emit]
  );

  const handleOpen = () => {
    setPendingStart(null);
    setOpen((o) => !o);
  };

  const handleClose = () => {
    setOpen(false);
    setPendingStart(null);
  };

  const displayValues: [string, string] = [
    currentRange[0] ? formatDateValue(currentRange[0], locale) : "",
    currentRange[1] ? formatDateValue(currentRange[1], locale) : "",
  ];

  const highlightRange: [Date | null, Date | null] = pendingStart
    ? [pendingStart, currentRange[1]]
    : [currentRange[0], currentRange[1]];

  return (
    <RangeInputTrigger
      displayValues={displayValues}
      placeholder={placeholder ?? ["Start date", "End date"]}
      className={className}
      style={style}
      onClick={handleOpen}
      open={open}
      onClose={handleClose}
    >
      <Popover open={open} onClose={handleClose}>
        <Calendar
          value={pendingStart ?? currentRange[0]}
          highlightRange={highlightRange}
          onSelect={handleSelect}
          min={min}
          max={max}
          defaultMonth={currentRange[0] ?? pendingStart ?? undefined}
        />
      </Popover>
    </RangeInputTrigger>
  );
}
