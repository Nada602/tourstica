import React, { useEffect } from "react";
import Footer from "../../components/layout/Footer/Footer";
import PreLoader from "../../components/Preloader/PreLoader";
import Categories from "../../components/sections/Category/Categories";
import Destinations from "../../components/sections/Destinations/Destinations";
import FAQ from "../../components/sections/Faq/Faq";
import FlashOffers from "../../components/sections/FlashOffers/FlashOffers";
import Hero from "../../components/sections/Hero/Hero";
import Plans from "../../components/sections/Plans/Plans";
import Testimonials from "../../components/sections/Testimonials/Testimonials";
import Trending from "../../components/sections/Trending/Trending";
import WhyChooseUs from "../../components/sections/WhyChooseUs/WhyChooseUs";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import Trending from "../../components/sections/Trending/Trending";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <>
      <PreLoader isLoading={isLoading} setIsLoading={setIsLoading} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <Destinations />
          <Categories />
          <Trending />
          <WhyChooseUs />
          <FlashOffers />
          <Plans />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </div>
    </>
  );
}
