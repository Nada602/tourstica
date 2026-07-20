import React, { useEffect } from "react";
import Footer from "../../components/layout/Footer/Footer.jsx";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hero from "./sections/Hero/Hero.jsx";
import Destinations from "./sections/Destinations/Destinations.jsx";
import Trending from "./sections/Trending/Trending.jsx";
import WhyChooseUs from "./sections/WhyChooseUs/WhyChooseUs.jsx";
import Plans from "./sections/Plans/Plans.jsx";
import Testimonials from "./sections/Testimonials/Testimonials.jsx";
import FAQ from "./sections/Faq/Faq.jsx";
import Categories from "./sections/Category/Categories.jsx";
import FlashOffers from "./sections/FlashOffers/FlashOffers.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function LandingPage() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
 
  
  return (
    <>
     
          <Hero />
          <Destinations />
          <Categories />
          <Trending />
          <WhyChooseUs />
          <FlashOffers />
          <Plans />
          <Testimonials />
          <FAQ />
        
    </>
  );
}
