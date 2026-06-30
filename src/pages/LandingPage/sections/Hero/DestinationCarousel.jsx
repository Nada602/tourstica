import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DestinationCard from "../../../../components/common/DestinationCard";

const destinations = [
  {
    id: 1,
    image: "./src/assets/bg/bg1.avif",
    title: "Buddha temple, Thailand",
    activeDot: 0,
  },
  {
    id: 2,
    image: "./src/assets/bg/bg2.avif",
    title: "Broken Beach, Bali",
    activeDot: 1,
  },
  { id: 3, image: "./src/assets/bg/bg3.jpg", title: "Kerala", activeDot: 0 },
  {
    id: 4,
    image: "./src/assets/bg/bg4.avif",
    title: "Kerala",
    activeDot: 0,
    variant: "edge",
  },
];

const VISIBLE = 3;
const CARD_STEP = 100; // المسافة بين كل كارت بالـ px أو %، زوّديها حسب عرض الكارت

export default function DestinationCarousel() {
  const cardsRef = useRef([]);
  const [startIndex, setStartIndex] = useState(0);
  const tlRef = useRef(null);

  useGSAP(() => {
    const interval = setInterval(() => {
      tlRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          // بنغيّر بس الـ "نقطة البداية المنطقية"، الكروت نفسها متحركتش في الـ DOM
          setStartIndex((prev) => (prev + 1) % destinations.length);
          gsap.set(cardsRef.current, { clearProps: "transform" });
        },
      });

      tl.to(cardsRef.current.slice(1, VISIBLE), {
        x: -CARD_STEP,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        cardsRef.current[0],
        {
          scale: 1.25,
          x: -CARD_STEP * 1.5,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power1.in",
        },
        "<",
      );

      tlRef.current = tl;
    }, 3000);

    return () => {
      clearInterval(interval);
      tlRef.current?.kill();
    };
  }, []);

  const visibleCards = Array.from(
    { length: VISIBLE },
    (_, i) => destinations[(startIndex + i) % destinations.length],
  );

  return (
    <div className="flex items-start gap-4 overflow-visible shrink-0">
      {visibleCards.map((dest, i) => (
        <DestinationCard
          key={`${dest.id}-${startIndex}`}
          ref={(el) => (cardsRef.current[i] = el)}
          {...dest}
        />
      ))}
    </div>
  );
}
