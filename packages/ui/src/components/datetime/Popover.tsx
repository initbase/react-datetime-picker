import React, { useRef } from "react";
import { useClickOutside } from "./hooks";

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Popover({ open, onClose, children, className = "", style }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose, open);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`rdp-popover ${className}`}
      style={style}
      role="dialog"
    >
      {children}
    </div>
  );
}
