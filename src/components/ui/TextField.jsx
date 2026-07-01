import React, { forwardRef } from "react";

const TextField = forwardRef(function TextField(
  { className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full h-11 rounded-lg border border-neutral-200 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition ${className}`}
    />
  );
});

export default TextField;
