import React, { forwardRef, useRef, useState } from "react";

const TextField = forwardRef(function TextField(
  { className = "", value, onChange, type = "text", ...props },
  ref,
) {
  const isSearch = type === "search";
  const inputRef = useRef(null);

  const handleInputRef = (node) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  const handleSearchIcon = (e) => {
    inputRef.current?.focus();
    // dispatch({ type: "SET_SEARCH", payload: inputValue });
    //   console.log("Search icon clicked, input value:", inputValue);
  };
  return (
    <div className={`w-full ${isSearch ? "relative" : ""}`}>
      {isSearch && (
        <button
          type="button"
          onClick={(e) => handleSearchIcon(e)}
          className="absolute inset-y-0 left-3 flex items-center text-neutral-400 cursor-pointer focus:outline-none"
          aria-label="Focus search input"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      )}

      <input
        ref={handleInputRef}
        value={value}
        onChange={onChange}
        type={type}
        {...props}
        className={`w-full h-11 rounded-lg border border-neutral-200 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition ${isSearch ? "pl-11" : ""} ${className}`}
      />
    </div>
  );
});

export default TextField;
