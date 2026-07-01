import React from "react";

export default function HeadingText({ children }) {
  return (
    <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-2 leading-tight">
      {children}
    </h1>
  );
}
