"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroTransition from "@/components/HeroTransition";
import FeatureShowcase from "@/components/FeatureShowcase";
import FeatureGrid from "@/components/FeatureGrid";
import BuiltDifferent from "@/components/BuiltDifferent";
import FocusSection from "@/components/FocusSection";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="relative">
        <Navbar />
        <main>
          <HeroTransition />
          <FeatureShowcase />
          <FeatureGrid />
          <BuiltDifferent />
          <FocusSection />
          <Testimonial />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
