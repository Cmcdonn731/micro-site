"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function WorkingHard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Heading reveal
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Subheading reveal with delay
      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Text paragraph reveal
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Floating images with parallax scroll
      if (img1Ref.current) {
        gsap.fromTo(
          img1Ref.current,
          { y: 100, opacity: 0 },
          {
            y: -100,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (img2Ref.current) {
        gsap.fromTo(
          img2Ref.current,
          { y: 50, opacity: 0 },
          {
            y: -150,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-[100px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Floating images */}
        <div
          ref={img1Ref}
          className="absolute -top-[47px] right-[calc(100%-197px)] hidden lg:block will-change-transform"
        >
          <Image
            src="/images/Calendar.png"
            alt="Calendar"
            width={240}
            height={240}
            className="rounded-[20px]"
          />
        </div>
        <div
          ref={img2Ref}
          className="absolute -top-[81px] left-[calc(100%-185px)] hidden lg:block will-change-transform"
        >
          <Image
            src="/images/Email.png"
            alt="Email"
            width={240}
            height={240}
            className="rounded-[20px]"
          />
        </div>

        {/* Text content */}
        <div className="max-w-[653px] mx-auto text-center">
          <h2
            ref={headingRef}
            className="font-[family-name:var(--font-playfair)] text-[72px] leading-[100%] tracking-[-0.05em] text-[var(--white1)] mb-[46px]"
          >
            Working hard just got easy
          </h2>
          <h3
            ref={subheadingRef}
            className="text-[44px] leading-[52px] tracking-[-0.05em] text-[var(--white1)] mb-[66px]"
          >
            The era of Brute Force Productivity™ is over and a new one has
            begun.
          </h3>
          <div
            ref={textRef}
            className="text-[19px] leading-[32px] tracking-[-0.05em] text-[var(--white1)] max-w-[503px] mx-auto text-left"
          >
            <p>
              Where everything is centralized - one place to catch up on all
              your <strong className="font-semibold">messages</strong>, check in
              on a <strong className="font-semibold">project</strong> or prep
              for a meeting with a customer or investor.
            </p>
            <p className="mt-4">
              Where your work is done for you -{" "}
              <strong className="font-semibold">CRM</strong> records are
              updated,{" "}
              <strong className="font-semibold">emails</strong> are triaged and{" "}
              <strong className="font-semibold">documents</strong> are drafted
              automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
