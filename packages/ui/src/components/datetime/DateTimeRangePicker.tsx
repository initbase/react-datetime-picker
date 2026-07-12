import React, { useState, useCallback, useMemo } from "react";
import { Popover } from "./Popover";
import { Calendar } from "./Calendar";
import { TimeColumn } from "./TimeColumn";
import { RangeInputTrigger } from "./InputTrigger";
import { clampDate, formatDateTimeValue, getAMPeriodLabels } from "./utils";
import type { DateTimeRangePickerProps, DateRangeValue } from "./types";

export function DateTimeRangePicker({
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
  renderTrigger,
}: DateTimeRangePickerProps) {
  const [range, setRange] = useState<DateRangeValue>(
    controlledValue ?? defaultValue ?? [null, null]
  );
  const [open, setOpen] = useState(false);
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [editingSide, setEditingSide] = useState<"date" | "start-time" | "end-time">("date");

  const isControlled = controlledValue !== undefined;
  const currentRange = isControlled ? controlledValue : range;

  const emit = (newRange: DateRangeValue) => {
    if (!isControlled) setRange(newRange);
    onChange?.(newRange);
  };

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (!pendingStart) {
        setPendingStart(date);
        emit([date, null]);
      } else {
        if (date.getTime() < pendingStart.getTime()) {
          emit([date, pendingStart]);
        } else {
          emit([pendingStart, date]);
        }
        setPendingStart(null);
        setEditingSide("start-time");
      }
    },
    [pendingStart, emit]
  );

  const getStart = (): Date => {
    const d = currentRange[0] ? new Date(currentRange[0]) : new Date();
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

  const handleClose = () => {
    setOpen(false);
    setPendingStart(null);
    setEditingSide("date");
  };

  const displayValues: [string, string] = [
    currentRange[0] ? formatDateTimeValue(currentRange[0], locale, showSeconds) : "",
    currentRange[1] ? formatDateTimeValue(currentRange[1], locale, showSeconds) : "",
  ];

  const highlightRange: [Date | null, Date | null] = pendingStart
    ? [pendingStart, currentRange[1]]
    : [currentRange[0], currentRange[1]];

  const start = getStart();
  const end = getEnd();

  const [amLabel, pmLabel] = useMemo(() => getAMPeriodLabels(locale), [locale]);

  const formatHour = (h: number) => {
    if (timeFormat === "12h") {
      const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${display} ${h < 12 ? amLabel : pmLabel}`;
    }
    return String(h).padStart(2, "0");
  };

  return (
    <RangeInputTrigger
      value={currentRange}
      displayValues={displayValues}
      placeholder={placeholder ?? ["Start date & time", "End date & time"]}
      className={className}
      style={style}
      onClick={() => setOpen((o) => !o)}
      open={open}
      onClose={handleClose}
      renderTrigger={renderTrigger}
    >
      <Popover open={open} onClose={handleClose} position={position} style={{ width: "max-content" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Calendar
            value={pendingStart ?? currentRange[0]}
            highlightRange={highlightRange}
            onSelect={handleDateSelect}
            min={min}
            max={max}
            locale={locale}
            defaultMonth={currentRange[0] ?? pendingStart ?? undefined}
          />
          {!pendingStart && currentRange[0] && currentRange[1] && (
            <div style={{ display: "flex", gap: 16 }}>
              <div className="rdp-datetime-range-panel">
                <div className="rdp-datetime-range-label">Start Time</div>
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
                <div className="rdp-datetime-range-label">End Time</div>
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
          )}
        </div>
      </Popover>
    </RangeInputTrigger>
  );
}
