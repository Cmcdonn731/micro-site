"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BuiltDifferent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -80]);

  return (
    <section ref={ref} className="relative py-[80px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Dot grid background */}
        <div className="relative rounded-[16px] overflow-hidden bg-[var(--black2)] min-h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 dot-grid opacity-30" />

          {/* Floating UI screenshots */}
          <div className="relative w-full max-w-[900px] mx-auto perspective-[900px]">
            <motion.div
              className="absolute -right-[223px] -top-[211px] hidden lg:block"
              style={{ y: y1, rotateX: rotate }}
            >
              <Image
                src="/images/CustomizedUIFill.png"
                alt="UI Screenshot"
                width={372}
                height={372}
                className="rounded-[16px] shadow-lg"
              />
            </motion.div>

            <motion.div
              className="absolute -left-[224px] -top-[40px] hidden lg:block"
              style={{ y: y2 }}
            >
              <Image
                src="/images/CustomizedUI.png"
                alt="UI Screenshot"
                width={340}
                height={385}
                className="rounded-[16px] shadow-lg"
              />
            </motion.div>

            {/* Central content */}
            <div className="relative z-10 text-center py-20">
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="text-[var(--white1)] text-[36px] font-medium">
                  Micro is Built different.
                </span>
                <Image
                  src="/images/shield.99c33afb.svg"
                  alt="Shield"
                  width={30}
                  height={30}
                />
              </div>

              {/* Floating product images */}
              <div className="flex justify-center gap-8 mt-8">
                <Image
                  src="/images/Company.png"
                  alt=""
                  width={106}
                  height={106}
                  className="rounded-[16px]"
                />
                <Image
                  src="/images/desktop-background.png"
                  alt=""
                  width={400}
                  height={250}
                  className="rounded-[16px] object-cover"
                />
                <Image
                  src="/images/Person.png"
                  alt=""
                  width={106}
                  height={106}
                  className="rounded-[16px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center mt-12 text-[19px] leading-[32px] text-[var(--white1)]">
          <span className="font-semibold">Built different</span>{" "}
          so you can build different.
        </p>
      </div>
    </section>
  );
}
