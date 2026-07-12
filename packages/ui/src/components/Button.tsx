import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", children, style, ...rest }: ButtonProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    border: "1px solid transparent"
  };
  const primary: React.CSSProperties = {
    backgroundColor: "#2563eb",
    color: "white"
  };
  const secondary: React.CSSProperties = {
    backgroundColor: "#f3f4f6",
    color: "#111827"
  };
  const merged: React.CSSProperties = {
    ...base,
    ...(variant === "primary" ? primary : secondary),
    ...(style || {})
  };
  return (
    <button style={merged} {...rest}>
      {children}
    </button>
  );
}