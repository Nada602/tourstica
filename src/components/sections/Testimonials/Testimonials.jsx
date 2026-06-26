import Header from "../../common/Header/Header";

// ── Data ──────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 0,
    rating: 5,
    text: "The desert overnight camp was absolutely magical. Watching the sunset over the Sahara dunes and sleeping under the stars was a once-in-a-lifetime experience. Our guide Hassan was incredible!",
    name: "Sarah Mitchell",
    location: "London, UK",
    trip: "Sahara Desert Camel Trek",
    date: "March 2025",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 1,
    rating: 5,
    text: "The desert overnight camp was absolutely magical. Watching the sunset over the Sahara dunes and sleeping under the stars was a once-in-a-lifetime experience. Our guide Hassan was incredible!",
    name: "Sarah Mitchell",
    location: "London, UK",
    trip: "Sahara Desert Camel Trek",
    date: "March 2025",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    rating: 5,
    text: "The desert overnight camp was absolutely magical. Watching the sunset over the Sahara dunes and sleeping under the stars was a once-in-a-lifetime experience. Our guide Hassan was incredible!",
    name: "Sarah Mitchell",
    location: "London, UK",
    trip: "Sahara Desert Camel Trek",
    date: "March 2025",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

// ── Stars ─────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-[#f5a623]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.352 2.777c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.663 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

// ── Review Card ───────────────────────────────────────────────
function ReviewCard({ rating, text, name, location, trip, date, avatar }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <Stars rating={rating} />
      <p className="text-xs text-gray-500 leading-relaxed italic">"{text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <img
          src={avatar}
          alt={name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-[#1a120b]">{name}</p>
          <p className="text-xs text-gray-400">{location}</p>
        </div>
      </div>

      {/* Trip + date */}
      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
        <span className="text-[11px] text-[#c0442a] font-semibold">{trip}</span>
        <span className="text-gray-300 text-xs">•</span>
        <span className="text-[11px] text-gray-400">{date}</span>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section className="w-full bg-[#f9f7f4] py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Header
          eyebrow="Real Reviews"
          title="What Our Guests Say"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
