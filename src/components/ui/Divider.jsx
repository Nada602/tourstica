import React from "react";

export default function Divider({ label = "OR" }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="h-px flex-1 bg-neutral-200" />
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}
