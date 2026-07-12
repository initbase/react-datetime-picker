import React, { useRef, useEffect } from "react";
import { generateTimeItems } from "./utils";

interface TimeColumnProps {
  count: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (value: number) => string;
}

export function TimeColumn({
  count,
  step,
  value,
  onChange,
  label,
  formatValue,
}: TimeColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = generateTimeItems(count, step);
  const selectedIndex = items.findIndex(
    (item) => parseInt(item, 10) === value
  );

  useEffect(() => {
    if (containerRef.current && selectedIndex >= 0) {
      const child = containerRef.current.children[
        selectedIndex + 1
      ] as HTMLElement;
      if (child) {
        child.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <div>
      {label && <div className="rdp-time-label">{label}</div>}
      <div className="rdp-time-column" ref={containerRef}>
        {items.map((item) => {
          const num = parseInt(item, 10);
          const isSelected = num === value;

          return (
            <button
              key={item}
              type="button"
              className={`rdp-time-item ${isSelected ? "rdp-time-item--selected" : ""}`}
              onClick={() => onChange(num)}
            >
              {formatValue ? formatValue(num) : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
