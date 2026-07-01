import React from "react";

export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`w-full h-11 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 transition ${className}`}
    >
      {children}
    </button>
  );
}
