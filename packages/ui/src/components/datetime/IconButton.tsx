import React from "react";

interface IconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function IconButton({
  onClick,
  disabled = false,
  className = "",
  children,
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
