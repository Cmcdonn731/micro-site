"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkingHard from "@/components/WorkingHard";
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
          <Hero />
          <WorkingHard />
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
