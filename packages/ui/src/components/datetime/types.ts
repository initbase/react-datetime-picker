import React from "react";

export type DateValue = Date | null;
export type DateRangeValue = [Date, Date] | [Date, null] | [null, Date] | [null, null];

export interface BasePickerProps {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
  defaultValue?: DateValue;
  locale?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export interface BaseRangePickerProps {
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  defaultValue?: DateRangeValue;
  locale?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: [string, string];
}

export interface DatePickerProps extends BasePickerProps {
  min?: Date;
  max?: Date;
}

export interface TimePickerProps extends BasePickerProps {
  step?: number;
  showSeconds?: boolean;
  timeFormat?: "12h" | "24h";
  min?: Date;
  max?: Date;
}

export interface DateTimePickerProps extends BasePickerProps {
  step?: number;
  showSeconds?: boolean;
  timeFormat?: "12h" | "24h";
  min?: Date;
  max?: Date;
}

export interface DateRangePickerProps extends BaseRangePickerProps {
  min?: Date;
  max?: Date;
}

export interface TimeRangePickerProps extends BaseRangePickerProps {
  step?: number;
  showSeconds?: boolean;
  timeFormat?: "12h" | "24h";
  min?: Date;
  max?: Date;
}

export interface DateTimeRangePickerProps extends BaseRangePickerProps {
  step?: number;
  showSeconds?: boolean;
  timeFormat?: "12h" | "24h";
  min?: Date;
  max?: Date;
}
