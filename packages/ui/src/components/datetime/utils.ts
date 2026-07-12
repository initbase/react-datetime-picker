export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getCalendarWeeks(year: number, month: number): Date[][] {
  const weeks: Date[][] = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  let currentWeek: Date[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    currentWeek.push(new Date(year, month - 1, prevMonthDays - i));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, month, day));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    const remaining = 7 - currentWeek.length;
    for (let i = 1; i <= remaining; i++) {
      currentWeek.push(new Date(year, month + 1, i));
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(
  day: Date,
  range: [Date, Date] | [Date | null, Date | null]
): boolean {
  const [start, end] = range;
  if (!start || !end) return false;
  const d = day.getTime();
  return d >= start.getTime() && d <= end.getTime();
}

export function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date.getTime() < min.getTime()) return new Date(min);
  if (max && date.getTime() > max.getTime()) return new Date(max);
  return date;
}

export function isDateDisabled(date: Date, min?: Date, max?: Date): boolean {
  if (min && date.getTime() < new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime())
    return true;
  if (max && date.getTime() > new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime())
    return true;
  return false;
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function formatDateValue(date: Date, locale: string = "en-US"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTimeValue(
  date: Date,
  locale: string = "en-US",
  showSeconds: boolean = false
): string {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
  });
}

export function formatDateTimeValue(
  date: Date,
  locale: string = "en-US",
  showSeconds: boolean = false
): string {
  return `${formatDateValue(date, locale)} ${formatTimeValue(date, locale, showSeconds)}`;
}

export function isTimeDisabled(
  date: Date,
  min?: Date,
  max?: Date
): boolean {
  if (!min && !max) return false;
  const time = date.getHours() * 60 + date.getMinutes();
  if (min) {
    const minTime = min.getHours() * 60 + min.getMinutes();
    if (time < minTime) return true;
  }
  if (max) {
    const maxTime = max.getHours() * 60 + max.getMinutes();
    if (time > maxTime) return true;
  }
  return false;
}

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function generateTimeItems(count: number, step: number = 1): string[] {
  const items: string[] = [];
  for (let i = 0; i < count; i += step) {
    items.push(String(i).padStart(2, "0"));
  }
  return items;
}
