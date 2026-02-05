"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mtY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 83px)" }}
    >
      {/* Parallax layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/Background.png"
          alt="Background sky"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: mtY }}>
        <Image
          src="/images/Mountains.png"
          alt="Mountains"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 origin-bottom"
        style={{ scale: fgScale }}
      >
        <Image
          src="/images/Foreground.png"
          alt="Foreground"
          fill
          className="object-cover object-bottom"
          priority
        />
      </motion.div>

      {/* Glass orbs */}
      <div className="absolute left-[20vw] top-[30vh] w-[120px] h-[120px] rounded-full bg-white/5 backdrop-blur-[12px] border border-white/10" />
      <div className="absolute left-[50vw] top-[40vh] w-[180px] h-[180px] rounded-full bg-white/5 backdrop-blur-[12px] border border-white/10" />
      <div className="absolute right-[15vw] top-[25vh] w-[70px] h-[70px] rounded-full bg-white/5 backdrop-blur-[12px] border border-white/10" />

      {/* Desktop screenshot in bottom area */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,1440px)] perspective-[100px]">
        <div className="relative w-full aspect-[1600/880]">
          <Image
            src="/images/desktop-background.png"
            alt="Micro desktop application"
            fill
            className="object-cover object-center rounded-t-[19px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--black1)]" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-16 z-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-3 items-end">
          {/* Left: description */}
          <div>
            <p className="text-[16px] leading-[20px] text-[var(--white1)] max-w-[321px]">
              Micro is an all-in-one tool for email, CRM, project management and
              more that automatically organizes itself.
            </p>
            <Link
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-[var(--white2)] text-[var(--black2)] px-[38px] py-[22px] rounded-full text-[15px] font-medium mt-10 hover:opacity-90 transition-opacity"
            >
              Join the Waitlist
              <Image
                src="/images/arrow.f400b257.svg"
                alt=""
                width={8}
                height={8}
                className="opacity-50"
              />
            </Link>
          </div>

          {/* Center: headline */}
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-[148px] leading-[100%] tracking-[-0.05em] text-[var(--white1)]">
              Organized.
            </h1>
          </div>

          {/* Right: subtitle */}
          <div className="text-right">
            <h2 className="font-[family-name:var(--font-playfair)] text-[31px] leading-[36px] text-[var(--white1)]">
              So you don&apos;t
              <br />
              have to be.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
