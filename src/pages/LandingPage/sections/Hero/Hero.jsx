import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./hero.module.css";
import DestinationCarousel from "./DestinationCarousel";
import Navbar from "@/components/layout/Navbar/Navbar";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";

const DESTINATIONS = [
  {
    id: 0,
    label: "Chefchaouen • Morocco",
    title: "The Blue Pearl",
    desc: "Chefchaouen is famous for its stunning blue-painted streets, charming medina, and breathtaking mountain views. Nestled in the Rif Mountains, it offers a peaceful atmosphere, rich culture, and unforgettable scenery.",
    bg: "https://images.unsplash.com/photo-1695601758107-cffeeceace44?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    label: "Morocco • Africa",
    title: "Landscapes",
    desc: "From the Atlas Mountains to the Atlantic coastline and the Sahara Desert, Morocco offers diverse natural wonders for every traveler.",
    bg: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    label: "Morocco • Africa",
    title: "Desert Escape",
    desc: "Embark on a traditional camel trek through Morocco's stunning desert landscapes and discover the authentic charm of nomadic life.",
    bg: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/27e74a0a4a3d235cb5ba37d7042ec293fdf2665f/big-0093aee3f5850ebbc6bfc224b3dde672.jpg",
  },
  {
    id: 3,
    label: "Morocco • Luxury Travel",
    title: "Luxury Morocco",
    desc: "Enjoy a premium journey through Morocco with luxury riads, private guided tours, exclusive desert camps, and unforgettable cultural experiences.",
    bg: "https://assets.waybird.com/cdn-cgi/image/width=1420,height=946,fit=crop,dpr=1,quality=60,gravity=0.5x0.5,format=auto/lodge_images/images/000/091/525/original/View01_Highres_smaller.jpg",
  },
];

export default function Hero() {
  // useGSAP(() => {
  //   const smoother = ScrollSmoother.create({
  //     smooth: 3,
  //     effects: true,
  //   });

  //   return () => smoother.kill();
  // });
  const [current, setCurrent] = useState(0);
  const [display, setDisplay] = useState(0);

  const bgRefs = useRef([]);
  const textRef = useRef(null);
  const heroRef = useRef(null);

  const currentRef = useRef(0);
  const busyRef = useRef(false);
  const tlRef = useRef(null);
  const autoRef = useRef(null);

  const goTo = useCallback((next) => {
    if (busyRef.current || next === currentRef.current) return;

    const prev = currentRef.current;
    const dir = next > prev ? 1 : -1;

    busyRef.current = true;
    currentRef.current = next;

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });

    tl.to(textRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: () => setDisplay(next),
    });

    tl.to(
      bgRefs.current[prev],
      { opacity: 0, duration: 0.55, ease: "power3.out" },
      0.2,
    ).fromTo(
      bgRefs.current[next],
      { opacity: 0, xPercent: dir * 8 },
      { opacity: 1, xPercent: 0, duration: 0.55, ease: "power3.out" },
      "<",
    );

    tl.set(textRef.current, { x: 30, opacity: 0 }).to(textRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % DESTINATIONS.length;
      goTo(next);
      setCurrent(next);
    }, 3000);

    return () => {
      clearInterval(autoRef.current);
      tlRef.current?.kill();
    };
  }, [goTo]);

  const dest = DESTINATIONS[display];

  return (
    // <div id="smooth-wrapper" className="h-screen overflow-hidden">
    //   <div id="smooth-content">
    <div ref={heroRef} className={styles.hero}>
      {DESTINATIONS.map((d, i) => (
        <div
          key={d.id}
          ref={(el) => (bgRefs.current[i] = el)}
          className={styles.bgSlide}
          style={{
            backgroundImage: `url(${d.bg})`,
            opacity: i === 0 ? 1 : 0,
          }}
        />
      ))}

      <div className={styles.overlay} />
      {/* <Navbar /> */}
      <div className={styles.sideLine} />
      <div className={styles.sideCounter}>
        {String(current + 1).padStart(2, "0")}/0{DESTINATIONS.length}
      </div>

      <div ref={textRef} className={`${styles.heroText} max-w-120 shrink-0`}>
        <div className={styles.heroLabel}>{dest.label}</div>
        <div className={styles.heroTitle}>{dest.title}</div>
        <div className={styles.heroDesc}>{dest.desc}</div>
        <button className={styles.heroBtn}>Explore →</button>
      </div>

      <div className={styles.heroCarsousel}>
        <DestinationCarousel />
      </div>
    </div>
    //   </div>
    // </div>
  );
}
