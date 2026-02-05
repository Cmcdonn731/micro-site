"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "We've been able to close much more capital since onboarding to Micro. It's eliminated 80% of the busywork we'd have to do and has helped us engage with investors we would have missed.",
    author: "Emmanuel Udotong",
    role: "Cofounder/CEO",
    company: "Shield",
    logo: "/images/shield.99c33afb.svg",
  },
  {
    quote:
      "Micro has completely transformed how our team manages projects. The AI-powered organization means we spend less time sorting and more time doing.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow",
    logo: "/images/shield.99c33afb.svg",
  },
  {
    quote:
      "The integration of email, CRM, and project management in one tool has been a game-changer for our startup. We can finally see everything in one place.",
    author: "Marcus Williams",
    role: "Founder",
    company: "Nexus Labs",
    logo: "/images/shield.99c33afb.svg",
  },
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="relative py-[100px]">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-start gap-12 max-w-[1100px] mx-auto">
          {/* Quote */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={t.logo}
                alt={t.company}
                width={40}
                height={40}
              />
            </div>
            <blockquote className="text-[28px] leading-[44px] tracking-[-0.03em] text-[var(--white1)] mb-6 font-[family-name:var(--font-playfair)]">
              {t.quote}
            </blockquote>
            <p className="text-[16px] text-[var(--white1)] opacity-60">
              {t.author} - {t.role} - {t.company}
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={prev}
              className="w-[34px] h-[34px] rounded-full bg-[var(--white4)] flex items-center justify-center hover:bg-[var(--white1)] transition-colors"
              aria-label="Previous testimonial"
            >
              <Image
                src="/images/arrow.f400b257.svg"
                alt="arrow up"
                width={10}
                height={10}
                className="rotate-180"
              />
            </button>
            <button
              onClick={next}
              className="w-[34px] h-[34px] rounded-full bg-[var(--white4)] flex items-center justify-center hover:bg-[var(--white1)] transition-colors"
              aria-label="Next testimonial"
            >
              <Image
                src="/images/arrow.f400b257.svg"
                alt="arrow down"
                width={10}
                height={10}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
