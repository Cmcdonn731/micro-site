"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const marqueeWords = [
  "AI-Powered",
  "All-In-One Tool",
  "Automatically",
  "Organizes Itself",
];

const features = [
  {
    title: "Everything in one place",
    description:
      "Fully-featured email client, CRM, task manager and more integrated with Gmail, Calendar, Linkedin, WhatsApp and other tools. Plus the ability to create pipeline trackers, project management tools and more on top of this data.",
    gradient: "from-transparent to-[var(--orange1)]",
  },
  {
    title: "Automatically Updated",
    description:
      "Everything - companies, people, and more - is enriched with hundreds of datapoints from a rich global and personal knowledge graph. Plus any property can be updated automatically when there's new email or meeting activity.",
    gradient: "from-transparent to-[var(--blue1)]",
  },
  {
    title: "Collaborative by default",
    description:
      "Create custom apps, objects, properties and more to power any kind of experience you can imagine or use Micro AI to generate it from your description.",
    gradient: "from-transparent to-[var(--green1)]",
  },
  {
    title: "Customized to work the way you do",
    description:
      "Create custom apps, objects, properties and more to power any kind of experience you can imagine or use Micro AI to generate it from your description.",
    gradient: "from-transparent to-[var(--purple1)]",
  },
];

export default function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-[100px]">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Marquee header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            {marqueeWords.map((word) => (
              <span
                key={word}
                className="text-[var(--white1)] font-[family-name:var(--font-space-mono)] text-[8px] tracking-[0.96px] uppercase"
              >
                {word}
              </span>
            ))}
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[72px] leading-[100%] tracking-[-0.05em] text-[var(--white1)] text-center">
            Micro works the way
            <br />
            you want to work
          </h2>
        </div>

        {/* Product screenshot */}
        <motion.div
          className="relative max-w-full mx-auto mb-16"
          style={{ y }}
        >
          <div className="relative w-full max-w-[1100px] mx-auto aspect-[1268/694] rounded-[10px] overflow-hidden">
            <Image
              src="/images/desktop-background.png"
              alt="Micro application"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="relative rounded-[16px] overflow-hidden bg-[var(--black6)] border border-[var(--black3)]"
            >
              {/* Card image area */}
              <div className="relative h-[200px] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-30`}
                />
                {i === 0 && (
                  <div className="absolute inset-8 flex items-center justify-center gap-4">
                    <Image
                      src="/images/Company.png"
                      alt=""
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <Image
                      src="/images/Email.png"
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <Image
                      src="/images/Task.png"
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  </div>
                )}
                {i === 1 && (
                  <div className="absolute inset-8 flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-[var(--black2)] rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--blue1)]/20" />
                      <div>
                        <p className="text-sm font-medium">Alec Douglas</p>
                        <p className="text-xs text-[var(--white5)]">
                          killer meeting with Eric today! 💪
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[var(--black2)] rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--green1)]/20" />
                      <div>
                        <p className="text-sm font-medium">Max Mason</p>
                        <p className="text-xs text-[var(--white5)]">
                          Omg they signed! 🎉
                        </p>
                      </div>
                    </div>
                    <div className="bg-[var(--black2)] rounded-lg p-3">
                      <p className="text-sm font-medium">Demo Meeting</p>
                      <p className="text-xs text-[var(--teal)]">Closed</p>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="absolute inset-8 flex items-center justify-center">
                    <div className="bg-[var(--black2)] rounded-[16px] p-4 border border-white/10 max-w-[280px]">
                      <Image
                        src="/images/Document.png"
                        alt=""
                        width={30}
                        height={30}
                        className="mb-2"
                      />
                      <h4 className="text-sm font-medium">
                        Help me organize our celebratory team offsite!
                      </h4>
                    </div>
                  </div>
                )}
                {i === 3 && (
                  <div className="absolute inset-8 flex items-center justify-center">
                    <Image
                      src="/images/CustomizedUIFill.png"
                      alt="Customized UI"
                      width={280}
                      height={160}
                      className="rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Card text */}
              <div className="p-6">
                <h5 className="text-[26px] font-medium leading-[31px] text-[var(--white1)] mb-[22px]">
                  {feature.title}
                </h5>
                <p className="text-[16px] leading-[24px] text-[var(--white1)] opacity-60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
