import React, { useState } from "react";
import { IconButton } from "./IconButton";
import { useControlled } from "./hooks";
import {
  getCalendarWeeks,
  isSameDay,
  isSameMonth,
  isInRange,
  isDateDisabled,
  WEEKDAY_LABELS,
  MONTH_LABELS,
} from "./utils";
import type { DateRangeValue } from "./types";

interface CalendarProps {
  value?: Date | null;
  highlightRange?: [Date | null, Date | null];
  onSelect: (date: Date) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  className?: string;
  style?: React.CSSProperties;
}

export function Calendar({
  value,
  highlightRange,
  onSelect,
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  min,
  max,
  className = "",
  style,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = useState(
    () => defaultMonth ?? value ?? new Date()
  );
  const month = controlledMonth ?? internalMonth;

  const setMonth = (d: Date) => {
    if (!controlledMonth) setInternalMonth(d);
    onMonthChange?.(d);
  };

  const weeks = getCalendarWeeks(month.getFullYear(), month.getMonth());

  const goToPrevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  const prevDisabled =
    min != null &&
    month.getFullYear() <= min.getFullYear() &&
    month.getMonth() <= min.getMonth();

  const nextDisabled =
    max != null &&
    month.getFullYear() >= max.getFullYear() &&
    month.getMonth() >= max.getMonth();

  const rangeStart = highlightRange?.[0] ?? null;
  const rangeEnd = highlightRange?.[1] ?? null;

  return (
    <div className={`rdp-calendar ${className}`} style={style}>
      <div className="rdp-calendar-header">
        <IconButton
          onClick={goToPrevMonth}
          disabled={prevDisabled}
          className="rdp-calendar-nav-btn"
          ariaLabel="Previous month"
        >
          <ChevronLeft />
        </IconButton>
        <span className="rdp-calendar-month-year">
          {MONTH_LABELS[month.getMonth()]} {month.getFullYear()}
        </span>
        <IconButton
          onClick={goToNextMonth}
          disabled={nextDisabled}
          className="rdp-calendar-nav-btn"
          ariaLabel="Next month"
        >
          <ChevronRight />
        </IconButton>
      </div>

      <div className="rdp-calendar-grid">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="rdp-calendar-weekday">
            {label}
          </div>
        ))}

        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const inCurrentMonth = isSameMonth(day, month);
            const isSelected = isSameDay(day, value ?? null);
            const isToday = isSameDay(day, new Date());
            const disabled = isDateDisabled(day, min, max);

            const range = highlightRange
              ? ([rangeStart, rangeEnd] as [Date, Date])
              : null;
            const inRange =
              range && range[0] && range[1]
                ? isInRange(day, range)
                : false;
            const isRangeStart = isSameDay(day, rangeStart);
            const isRangeEnd = isSameDay(day, rangeEnd);

            let cls = "rdp-calendar-day";
            if (!inCurrentMonth) cls += " rdp-calendar-day--outside";
            if (isSelected) cls += " rdp-calendar-day--selected";
            if (isToday) cls += " rdp-calendar-day--today";
            if (inRange && !isRangeStart && !isRangeEnd) cls += " rdp-calendar-day--in-range";
            if (isRangeStart) cls += " rdp-calendar-day--range-start";
            if (isRangeEnd) cls += " rdp-calendar-day--range-end";

            return (
              <button
                key={`${wi}-${di}`}
                type="button"
                className={cls}
                disabled={disabled}
                onClick={() => onSelect(day)}
                aria-label={day.toLocaleDateString()}
              >
                {day.getDate()}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
