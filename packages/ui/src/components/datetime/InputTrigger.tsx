import React, { useRef } from "react";
import type { SingleTriggerProps, RangeTriggerProps, DateValue, DateRangeValue } from "./types";

interface InputTriggerProps {
  value?: DateValue;
  displayValue: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  renderTrigger?: (props: SingleTriggerProps) => React.ReactNode;
}

export function InputTrigger({
  value,
  displayValue,
  placeholder,
  className = "",
  style,
  onClick,
  open,
  onClose,
  children,
  renderTrigger,
}: InputTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={`rdp-wrapper ${className}`} style={style}>
      {renderTrigger ? (
        renderTrigger({ value: value ?? null, displayValue, placeholder, onClick, open, onClose })
      ) : (
        <button
          type="button"
          className="rdp-trigger"
          onClick={onClick}
        >
          <span style={{ flex: 1, textAlign: "left", color: displayValue ? "inherit" : "var(--rdp-text-muted)" }}>
            {displayValue || placeholder || "Select..."}
          </span>
          <CalendarIcon />
        </button>
      )}
      {children}
    </div>
  );
}

interface RangeInputTriggerProps {
  value?: DateRangeValue;
  displayValues: [string, string];
  placeholder?: [string, string];
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  renderTrigger?: (props: RangeTriggerProps) => React.ReactNode;
}

export function RangeInputTrigger({
  value,
  displayValues,
  placeholder,
  className = "",
  style,
  onClick,
  open,
  onClose,
  children,
  renderTrigger,
}: RangeInputTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={`rdp-wrapper ${className}`} style={style}>
      {renderTrigger ? (
        renderTrigger({ value: value ?? [null, null], displayValues, placeholder, onClick, open, onClose })
      ) : (
        <div
          className="rdp-trigger rdp-trigger--range"
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
        >
          <input
            type="text"
            readOnly
            value={displayValues[0]}
            placeholder={placeholder?.[0] ?? "Start"}
          />
          <span className="rdp-trigger-range-separator">&ndash;</span>
          <input
            type="text"
            readOnly
            value={displayValues[1]}
            placeholder={placeholder?.[1] ?? "End"}
          />
          <CalendarIcon />
        </div>
      )}
      {children}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="rdp-trigger-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="2.5" width="13" height="12" rx="2" />
      <line x1="1.5" y1="6" x2="14.5" y2="6" />
      <line x1="5" y1="1" x2="5" y2="4" />
      <line x1="11" y1="1" x2="11" y2="4" />
    </svg>
  );
}
