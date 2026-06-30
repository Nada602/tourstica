import { useState } from "react";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import styles from "./trending.module.css";
import Header from "../../../../components/common/Header/Header";
import TripCard from "../../../../components/common/TripCard/TripCard";
// ── Data ──────────────────────────────────────────────────────
const TRIPS = [
  {
    id: 0,
    location: "Marrakesh",
    title: "Sahara Desert Camel Trek & Overnight Camp",
    rating: 4.9,
    reviews: 634,
    duration: "3 h",
    price: "4.509",
    currency: "MAD",
    originalPrice: "8.841",
    discount: "-49%",
    featured: true,
    defaultLiked: true,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80",
  },
  {
    id: 1,
    location: "Marrakesh",
    title: "Sahara Desert Camel Trek & Overnight Camp",
    rating: 4.9,
    reviews: 634,
    duration: "3 h",
    price: "4.509",
    currency: "MAD",
    originalPrice: "8.841",
    discount: "-49%",
    featured: true,
    defaultLiked: false,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80",
  },
  {
    id: 2,
    location: "Marrakesh",
    title: "Sahara Desert Camel Trek & Overnight Camp",
    rating: 4.9,
    reviews: 634,
    duration: "3 h",
    price: "4.509",
    currency: "MAD",
    originalPrice: "8.841",
    discount: "-49%",
    featured: true,
    defaultLiked: false,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  },
  {
    id: 3,
    location: "Marrakesh",
    title: "Sahara Desert Camel Trek & Overnight Camp",
    rating: 4.9,
    reviews: 634,
    duration: "3 h",
    price: "4.509",
    currency: "MAD",
    originalPrice: "8.841",
    discount: "-49%",
    featured: true,
    defaultLiked: false,
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80",
  },
];

const TABS = [
  { id: "trending", label: "Trending", Icon: Flame },
  { id: "new", label: "Just added", Icon: Sparkles },
  { id: "toprated", label: "Top rated", Icon: TrendingUp },
];

export default function Trending() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <section className="w-full bg-[#f9f7f4] py-8 sm:py-12 px-4 sm:px-6 md:px-10">
      <Header
        eyebrow="What is New"
        title="Trending right now"
        accentWord="Trending"
        linkText="Browse all experiences →"
        linkHref="/experiences"
      />
      {/* ── Filter tabs ─────────────────────────────────────── */}
      {/* On mobile: full-width pill row, scrollable if needed */}
      <div className="flex items-center bg-white rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 gap-1 shadow-sm mb-6 sm:mb-8 overflow-x-auto w-fit max-w-full">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
              activeTab === id
                ? styles.tabActive
                : "text-[#1a120b] hover:bg-gray-100"
            }`}
          >
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Cards ───────────────────────────────────────────── */}
      <div className={styles.cardRow}>
        {TRIPS.map((trip) => (
          <TripCard
            key={trip.id}
            image={trip.image}
            title={trip.title}
            location={trip.location}
            rating={trip.rating}
            reviews={trip.reviews}
            duration={trip.duration}
            price={trip.price}
            currency={trip.currency}
            originalPrice={trip.originalPrice}
            discount={trip.discount}
            featured={trip.featured}
            defaultLiked={trip.defaultLiked}
            onView={() => console.log("View trip", trip.id)}
          />
        ))}
      </div>
    </section>
  );
}
