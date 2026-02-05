"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FocusSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [200, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [180, -120]);

  return (
    <section ref={ref} className="relative py-[100px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 relative min-h-[800px]">
        {/* Floating product images */}
        <motion.div
          className="absolute left-[148px] hidden lg:block"
          style={{ y: y1, top: "calc(60% + 160px)" }}
        >
          <Image
            src="/images/Company.png"
            alt=""
            width={76}
            height={76}
            className="rounded-[10px]"
          />
        </motion.div>

        <motion.div
          className="absolute left-[665px] hidden lg:block"
          style={{ y: y2, top: "calc(40% + 40px)" }}
        >
          <Image
            src="/images/Calendar.png"
            alt=""
            width={213}
            height={213}
            className="rounded-[16px]"
          />
        </motion.div>

        <motion.div
          className="absolute right-[148px] hidden lg:block"
          style={{ y: y3, top: "calc(50% + 96px)" }}
        >
          <Image
            src="/images/Email.png"
            alt=""
            width={213}
            height={213}
            className="rounded-[16px]"
          />
        </motion.div>

        {/* Main heading */}
        <div className="relative z-10 pt-[230px]">
          <h2 className="font-[family-name:var(--font-playfair)] text-[132px] leading-[100%] tracking-[-0.05em] text-[var(--black3)] max-w-[900px]">
            Designed to let you focus on your work,{" "}
            <span className="text-[var(--white1)]">not productivity.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
