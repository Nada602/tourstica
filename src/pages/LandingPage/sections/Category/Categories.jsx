import img1 from "/src/assets/categories/343e52df865372d943b8365cd20763119381d88c.png";
import img2 from "/src/assets/categories/47a637ed8df5e0f3f9e068e2e0b5377a9f1cd66e.png";
import img3 from "/src/assets/categories/234426a303569e0161335d3d0db7e6c85233117e.png";
import img4 from "/src/assets/categories/photo-1695601758107-cffeeceace44.avif";
import img5 from "/src/assets/categories/1de492c0082a12e2efd622ce7597a050ccb9ec3f.png";
import img6 from "/src/assets/categories/3abfdf6b6932e539dfaeebc8e816727ea43d1f81.png";
import img7 from "/src/assets/categories/715776298b0dd6fd80fce29d0a6203a93ca1214d.jpg";

const CATEGORIES = [
  {
    id: 0,
    label: "Medina",
    count: "148",
    image: img1,
  },
  {
    id: 1,
    label: "Desert",
    count: "148",
    image: img2,
  },
  {
    id: 2,
    label: "Mountains",
    count: "148",
    image: img3,
  },
  {
    id: 3,
    label: "Blue City",
    count: "148",
    image: img4,
  },
  {
    id: 4,
    label: "Beach",
    count: "148",
    image: img5,
  },
  {
    id: 5,
    label: "Desert",
    count: "148",
    image: img6,
  },
  {
    id: 6,
    label: "Food",
    count: "148",
    image: img7,
  },
];

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Header from "../../../../components/common/Header/Header";

export default function NewsTicker() {
  const rowRef = useRef(null);

  useGSAP(() => {
    const row = rowRef.current;
    const totalWidth = row.scrollWidth / 2; // عرض نص المحتوى (نسخة واحدة بس)

    gsap.to(row, {
      x: -totalWidth,
      duration: 10, // كل ما تقللي الرقم، كل ما السرعة تزيد
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 text-center">
      <Header
        eyebrow="Explore by Category"
        title="What Do You Want to Do?"
        accentWord="You"
        subtitle="Choose your adventure style and discover experiences tailored to your interests"
        align="center"
      />
      <div className="overflow-hidden w-full  py-3">
        <div ref={rowRef} className="flex gap-10 w-max whitespace-nowrap">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map(
            (cat, i) => (
              <div key={i} className="flex flex-col items-center shrink-0">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-28 h-28 rounded-full object-cover"
                />
                <span className="mt-2 font-semibold">{cat.label}</span>
                <span className="text-sm text-gray-400">148 experiences</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
