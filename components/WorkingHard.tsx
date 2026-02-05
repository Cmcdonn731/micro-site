"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WorkingHard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);

  return (
    <section ref={ref} className="relative py-[100px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Floating images */}
        <motion.div
          className="absolute -top-[47px] right-[calc(100%-197px)] hidden lg:block"
          style={{ y: y1 }}
        >
          <Image
            src="/images/Calendar.png"
            alt="Calendar"
            width={240}
            height={240}
            className="rounded-[20px]"
          />
        </motion.div>
        <motion.div
          className="absolute -top-[81px] left-[calc(100%-185px)] hidden lg:block"
          style={{ y: y2 }}
        >
          <Image
            src="/images/Email.png"
            alt="Email"
            width={240}
            height={240}
            className="rounded-[20px]"
          />
        </motion.div>

        {/* Text content */}
        <div className="max-w-[653px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[72px] leading-[100%] tracking-[-0.05em] text-[var(--white1)] mb-[46px]">
            Working hard just got easy
          </h2>
          <h3 className="text-[44px] leading-[52px] tracking-[-0.05em] text-[var(--white1)] mb-[66px]">
            The era of Brute Force Productivity™ is over and a new one has
            begun.
          </h3>
          <div className="text-[19px] leading-[32px] tracking-[-0.05em] text-[var(--white1)] max-w-[503px] mx-auto text-left">
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
