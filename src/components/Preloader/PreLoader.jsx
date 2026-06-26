import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import heroImg from "../../assets/logo.png";
export default function PreLoader({ isLoading, setIsLoading }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const logoRef = useRef(null);
  const [progress, setProgress] = React.useState(0);
  const hasExited = useRef(false);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, setIsLoading]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(logoRef.current, {
      y: 20,
      opacity: 0.8,
      duration: 1,
      ease: "power3.out",
    }).from(
      progressRef.current,
      { y: 20, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.5",
    );
  }, []);

  useGSAP(() => {
    if (isLoading || hasExited.current) return;
    hasExited.current = true;

    const exitTl = gsap.timeline({ delay: 0.5 });

    exitTl
      .to(logoRef.current, { y: -20, duration: 1, ease: "power2.in" })
      .to(
        containerRef.current,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        "-=0.2",
      );
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-brown overflow-hidden bg-amber-800"
    >
      <div ref={logoRef} className="relative mb-8">
        <img src={heroImg} alt="Tourstica Logo" className="w-32 md:w-60" />
      </div>
      <div className="w-64 h-1 bg-dark-brown/10 rounded-full overflow-hidden relative">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-milk transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-bold text-milk uppercase text-amber-50 tracking-widest text-xs">
        Loading... {Math.round(progress)}%
      </div>
    </div>
  );
}
