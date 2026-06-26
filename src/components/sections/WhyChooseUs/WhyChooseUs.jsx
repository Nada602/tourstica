// ── Feature data ──────────────────────────────────────────────
import React from "react";
import styles from "./WhyChooseUs.module.css";
import {
  ShieldCheck, // 100% Secure Booking
  BadgeCheck, // Trusted Local Guides
  Headphones, // 24/7 Support
  WalletCards, // Best Price Guaranteed
  Globe, // Full Morocco Coverage
  Sparkles, // Exclusive Experiences
} from "lucide-react";
import Header from "../../common/Header/Header";
const FEATURES = [
  {
    id: 0,
    icon: ShieldCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "100% Secure Booking",
    desc: "Encrypted payments with full refund guarantee upon cancellation.",
  },
  {
    id: 1,
    icon: BadgeCheck,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    title: "Trusted Local Guides",
    desc: "All our guides are certified and reviewed by thousands of travelers.",
  },
  {
    id: 2,
    icon: Headphones,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "24/7 Support",
    desc: "Our support team is available around the clock to answer your questions.",
  },
  {
    id: 3,
    icon: WalletCards,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    title: "Best Price Guaranteed",
    desc: "We will match any lower price you find elsewhere for the same experience.",
  },
  {
    id: 4,
    icon: Globe,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Full Morocco Coverage",
    desc: "Over 500 experiences in 20+ cities and destinations across Morocco.",
  },
  {
    id: 5,
    icon: Sparkles,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    title: "Exclusive Experiences",
    desc: "Access to places and experiences you cannot find anywhere else.",
  },
];

// ── Feature Card ──────────────────────────────────────────────
// ✅ Correct
function FeatureCard({ icon: Icon, iconBg, iconColor, title, desc }) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div
        className={`${iconBg} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#1a120b] mb-0.5">{title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#f9f7f4] py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* ── Left: Images ──────────────────────────────────── */}
        <div className="relative w-full max-w-sm lg:max-w-none lg:w-[42%] flex-shrink-0 h-72 sm:h-80 md:h-96 lg:h-[420px]">
          {/* Main large image */}
          <div className="absolute top-0 left-0 w-[72%] h-[78%] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80"
              alt="Morocco riad courtyard"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping circle image */}
          <div
            className={`absolute bottom-0 right-0 w-[54%] h-[58%] rounded-full overflow-hidden border-4 border-[#f9f7f4] shadow-xl ${styles.animated_circle}`}
          >
            <img
              src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=500&q=80"
              alt="Morocco market"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ── Right: Text + Features ─────────────────────────── */}
        <div className="flex-1 w-full">
          {/* Header */}
          <Header
            eyebrow="Why Choose Us"
            title="Traveling to Morocco Has Never Been Easier"
            accentWord="Morocco"
          />

          {/* Features grid: 1 col on mobile, 2 cols on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {FEATURES.map((f) => (
              <FeatureCard key={f.id} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
