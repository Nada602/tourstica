// ── Steps data ────────────────────────────────────────────────
import { useRef } from "react";
import styles from "./plans.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const STEPS = [
  {
    id: 1,
    title: "Browse & discover",
    desc: "Search by city, category, or map. Filter by price, duration, and private availability, or find exactly what you're looking for.",
  },
  {
    id: 2,
    title: "Book instantly",
    desc: "Choose your experience, confirm the number of travelers, and book in under two minutes. Instant confirmation on most experiences.",
  },
  {
    id: 3,
    title: "Live the moment",
    desc: "Meet your guide and experience it your own pace. Receive your itinerary, pickup details, and all tips by email instantly.",
  },
];

// ── Step Item ──────────────────────────────────────────────────
function StepItem({ id, title, desc, isLast, index, setStepRef }) {
  return (
    <div className="flex gap-4" ref={(el) => setStepRef(el, index)}>
      {/* Number + vertical line */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#f0ece6] border-2 border-[#c0442a] flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-extrabold text-[#c0442a]">
            {String(id).padStart(2, "0")}
          </span>
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 bg-gray-200 mt-1"
            style={{ minHeight: 32 }}
          />
        )}
      </div>

      {/* Text  i will make animation here  */}
      <div className={`pb-6 ${styles.animatedText}`}>
        <p className="text-sm font-bold text-[#1a120b] mb-1">{title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Plans() {
  const stepsRef = useRef([]);

  useGSAP(() => {
    gsap.from(stepsRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.25,

      scrollTrigger: {
        trigger: stepsRef.current[0], // or the whole section
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);
  const setStepRef = (el, index) => {
    if (el) stepsRef.current[index] = el;
  };
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* ── Left: text ──────────────────────────────────── */}
        <div className="flex-1 w-full order-2 lg:order-1">
          {/* Header */}
          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#c0442a] uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-[#c0442a] inline-block" />
            Simple Process
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a120b] leading-tight mb-8">
            Plan your trip in three steps
          </h2>

          {/* Steps */}
          <div>
            {STEPS.map((step, i) => (
              <StepItem
                key={step.id}
                {...step}
                isLast={i === STEPS.length - 1}
                textRef={stepsRef}
                index={i}
                setStepRef={setStepRef}
              />
            ))}
          </div>
        </div>

        {/* ── Right: image card ────────────────────────────── */}
        <div className="w-full lg:w-[48%] flex-shrink-0 order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80"
              alt="Morocco riad"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[460px] object-cover"
            />

            {/* Rating badge */}
            <div className="absolute top-4 right-4 bg-white rounded-2xl px-3 py-2 shadow-lg flex flex-col items-center">
              <span className="text-xl font-extrabold text-[#1a120b] leading-none">
                4.8
              </span>
              <div className="flex gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={`w-3 h-3 ${s <= 4 ? "text-[#f5a623]" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.352 2.777c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.663 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <span className="text-[9px] text-gray-400 text-center leading-tight">
                Avg. rating
                <br />
                170k+ reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
