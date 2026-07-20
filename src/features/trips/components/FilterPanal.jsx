import React from "react";
const categories = [
  { label: "Adventure", count: 1 },
  { label: "Photography", count: 1 },
  { label: "Food", count: 1 },
  { label: "Water", count: 1 },
  { label: "Mountain", count: 1 },
  { label: "Workshop", count: 1 },
  { label: "Desert", count: 1 },
];

const quickPriceRanges = [
  { label: "0-50" },
  { label: "50-150" },
  { label: "150+" },
];

const durations = ["Half day (under 4h)", "Full day (4–8h)", "Multi-day (8h+)"];

const options = ["Private option available", "Pickup available"];

export default function FilterPanal({
  selectedCategories,
  onCategoryToggle,
  priceValue,
  priceMax,
  selectedQuickPriceRange,
  onPriceChange,
  onQuickPriceSelect,
  selectedDuration,
  onDurationChange,
  selectedOption,
  onOptionChange,
  onReset,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-4xl shadow-sm overflow-hidden w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold tracking-[0.18em] uppercase text-[#2f241e]">
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-[#8a6f63] hover:text-[#c0442a] transition-colors duration-200"
        >
          Reset all
        </button>
      </div>

      <div className="px-6 py-5 space-y-6">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b80]">
            Category
          </p>
          <div className="mt-4 space-y-3">
            {categories.map((category) => {
              const checked = selectedCategories.includes(category.label);
              return (
                <label
                  key={category.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-[#fcfbfa] px-4 py-3 text-sm text-[#4a423d] hover:border-[#c0442a] transition-colors duration-200"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onCategoryToggle(category.label)}
                      className="h-4 w-4 rounded border-gray-300 text-[#c0442a] focus:ring-[#c0442a]"
                    />
                    {category.label}
                  </span>
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f6f0ea] px-2 text-[11px] font-semibold text-[#8e7c73]">
                    {category.count}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b80]">
            Price range
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-[#8a7b70]">
            <span>0 MAD</span>
            <span>{priceValue}+ MAD</span>
          </div>
          <input
            type="range"
            min="0"
            max={priceMax}
            value={priceValue}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="mt-3 w-full accent-[#c0442a]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {quickPriceRanges.map((range) => {
              const active = selectedQuickPriceRange === range.label;
              return (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => onQuickPriceSelect(range.label)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    active
                      ? "border-[#c0442a] bg-[#fef3ef] text-[#c0442a]"
                      : "border-gray-200 bg-white text-[#6e635c] hover:border-[#c0442a] hover:text-[#c0442a]"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b80]">
            Duration
          </p>
          <div className="mt-4 space-y-3">
            {durations.map((duration) => {
              const checked = selectedDuration === duration;
              return (
                <label
                  key={duration}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#fcfbfa] px-4 py-3 text-sm text-[#4a423d] hover:border-[#c0442a] transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="duration"
                    checked={checked}
                    onChange={() => onDurationChange(duration)}
                    className="h-4 w-4 rounded-full border-gray-300 text-[#c0442a] focus:ring-[#c0442a]"
                  />
                  {duration}
                </label>
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b80]">
            Options
          </p>
          <div className="mt-4 space-y-3">
            {options.map((option) => {
              const checked = selectedOption === option;
              return (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#fcfbfa] px-4 py-3 text-sm text-[#4a423d] hover:border-[#c0442a] transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="option"
                    checked={checked}
                    onChange={() => onOptionChange(option)}
                    className="h-4 w-4 rounded-full border-gray-300 text-[#c0442a] focus:ring-[#c0442a]"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
