import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "../../common/Header/Header";

// ── Data ──────────────────────────────────────────────────────
const FAQS = [
  {
    id: 0,
    question: "How do I book an experience on RihlaMa?",
    answer:
      "Simply browse our experiences, choose the one you like, select your date and number of travelers, then complete the booking in under two minutes. You'll receive instant confirmation by email.",
  },
  {
    id: 1,
    question: "What is your cancellation policy?",
    answer:
      "Most experiences offer free cancellation up to 24 hours before the start time. Some special or private experiences may have different policies, which are clearly stated on the experience page.",
  },
  {
    id: 2,
    question: "Are the guides vetted and certified?",
    answer:
      "Yes. All our local guides go through a thorough vetting process, including identity verification, certification checks, and traveler review monitoring. We only work with the best.",
  },
  {
    id: 3,
    question: "What currencies and payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. Prices are displayed in MAD but you can pay in your local currency.",
  },
  {
    id: 4,
    question: "Can I book a private or custom experience?",
    answer:
      "Absolutely. Many of our experiences offer a private option at checkout. You can also contact us directly to arrange fully customized itineraries for groups or special occasions.",
  },
  {
    id: 5,
    question: "Is pickup included in the experience price?",
    answer:
      "Pickup details vary by experience. Many include hotel pickup in the city center. The exact pickup information is always listed on the experience page before you book.",
  },
];

// ── FAQ Item ──────────────────────────────────────────────────
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-[#1a120b]">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-180 border-[#c0442a]" : ""
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors duration-300 ${
              isOpen ? "text-[#c0442a]" : "text-gray-400"
            }`}
          />
        </span>
      </button>

      {/* Answer — animated open/close */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <Header
          eyebrow="Got Questions?"
          title="Everything you need to know."
          align="center"
        />

        <div className="mt-8">
          {FAQS.map((faq) => (
            <FaqItem
              key={faq.id}
              {...faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
