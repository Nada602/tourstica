import React from "react";

export default function StatCard({ number = 0, label, className = ""}) {
  return (
    <div
      className={`bg-[#f5f3ef] rounded-3xl py-4 px-5 text-center max-w-25 shadow-lg  ${className}`}
    >
      <div className="text-2xl text-left  font-medium text-[#1a1a1a] mb-2">
        {number}
      </div>
      <div className="text-xs text-left   text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}
