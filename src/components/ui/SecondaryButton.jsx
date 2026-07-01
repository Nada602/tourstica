import React from "react";

export default function SecondaryButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`w-full h-11 rounded-lg border border-neutral-200 hover:border-amber-600 text-neutral-900 text-sm font-semibold flex items-center justify-center gap-2 transition ${className}`}
    >
      {children}
    </button>
  );
}
