import { useState, useEffect } from "react";

// ── Countdown Hook ────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(0, targetDate - Date.now());
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

// ── Timer Box ─────────────────────────────────────────────────
function TimerBox({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-[#1a120b] text-white rounded-lg w-10 h-10 sm:w-11 sm:h-11 justify-center">
      <span className="text-sm sm:text-base font-extrabold leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] uppercase tracking-wide opacity-60 leading-none mt-0.5">
        {label}
      </span>
    </div>
  );
}

// ── Offer data ────────────────────────────────────────────────
const OFFERS = [
  {
    id: 0,
    title: "Sahara Desert Camel Trek & Overnight Camp",
    location: "Marrakech",
    price: "4.509",
    originalPrice: "8.841",
    discount: "-49%",
    spotsLeft: 4,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80",
  },
  {
    id: 1,
    title: "Sahara Desert Camel Trek & Overnight Camp",
    location: "Marrakech",
    price: "4.509",
    originalPrice: "8.841",
    discount: "-42%",
    spotsLeft: 4,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80",
  },
  {
    id: 2,
    title: "Sahara Desert Camel Trek & Overnight Camp",
    location: "Marrakech",
    price: "4.509",
    originalPrice: "8.841",
    discount: "-68%",
    spotsLeft: 4,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  },
];

// End time: 2 hours from now (persists across re-renders via module-level constant)
const END_TIME = Date.now() + 2 * 60 * 60 * 1000;

// ── Offer Card ────────────────────────────────────────────────
function OfferCard({
  image,
  title,
  location,
  price,
  originalPrice,
  discount,
  spotsLeft,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-40 sm:h-44 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {discount && (
          <span className="absolute top-3 right-3 bg-[#c0442a] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            {discount}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-xs text-gray-400 font-medium">{location}</p>
        <p className="text-sm font-bold text-[#1a120b] leading-snug line-clamp-2">
          {title}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
          <span className="text-base font-extrabold text-[#1a120b]">
            {price}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Spots left */}
        {spotsLeft && (
          <p className="text-[11px] font-semibold text-[#c0442a] mt-0.5">
            Only {spotsLeft} spots left at this price
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function FlashOffers() {
  const { hours, minutes, seconds } = useCountdown(END_TIME);

  return (
    <section className="w-full bg-[#f9f7f4] py-10 sm:py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#c0442a] uppercase tracking-widest mb-1.5">
              <span className="w-4 h-px bg-[#c0442a] inline-block" />
              Limited Time
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a120b]">
              Flash offers
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs text-gray-400 font-medium mr-1">
              Ends in
            </span>
            <TimerBox value={hours} label="hrs" />
            <span className="text-[#1a120b] font-bold text-lg">:</span>
            <TimerBox value={minutes} label="min" />
            <span className="text-[#1a120b] font-bold text-lg">:</span>
            <TimerBox value={seconds} label="sec" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
