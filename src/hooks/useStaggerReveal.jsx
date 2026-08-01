import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useStaggerReveal(options = {}) {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      const el = sectionRef.current.querySelectorAll("[data-reveal]");
      gsap.from(el, {
        x: options.x || 0,
        y: options.y || 0,
        duration: options.duration || 1.5,
        opacity: options.opacity || 0,
        ease: options.ease || "power3.inOut",
        stagger: options.stagger || 0.15,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: options.start || "top 80%",
          toggleActions: options.toggleActions || "restart none restart none",
        },
      });
    },
    { scope: sectionRef },
  );

  return sectionRef;
}
