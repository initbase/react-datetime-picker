import React, { useRef, useState, useLayoutEffect } from "react";
import { useClickOutside } from "./hooks";
import type { PopoverPosition } from "./types";

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  position?: PopoverPosition;
}

function getPositionClass(pos: PopoverPosition): string {
  return `rdp-popover--${pos}`;
}

export function Popover({
  open,
  onClose,
  children,
  className = "",
  style,
  position = "flexible",
}: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolvedPosition, setResolvedPosition] = useState<PopoverPosition>(position);
  const [visible, setVisible] = useState(false);

  useClickOutside(ref, onClose, open);

  useLayoutEffect(() => {
    if (!open) {
      setVisible(false);
      setResolvedPosition(position);
      return;
    }

    if (position !== "flexible") {
      setResolvedPosition(position);
      setVisible(true);
      return;
    }

    setVisible(false);
    setResolvedPosition("bottom");

    requestAnimationFrame(() => {
      if (!ref.current) return;

      const popoverRect = ref.current.getBoundingClientRect();
      const wrapper = ref.current.parentElement;
      if (!wrapper) {
        setVisible(true);
        return;
      }

      const wrapperRect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - wrapperRect.bottom;
      const spaceAbove = wrapperRect.top;

      if (spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove) {
        setResolvedPosition("bottom");
      } else if (spaceAbove >= popoverRect.height) {
        setResolvedPosition("top");
      }

      setVisible(true);
    });
  }, [open, position]);

  if (!open) return null;

  const positionClass = getPositionClass(resolvedPosition);

  return (
    <div
      ref={ref}
      className={`rdp-popover ${positionClass} ${className}`}
      style={{ ...style, visibility: visible ? "visible" : "hidden" }}
      role="dialog"
    >
      {children}
    </div>
  );
}
