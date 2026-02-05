"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = [
  { label: "Home", icon: "/images/Company.png" },
  { label: "Messages", icon: "/images/Email.png" },
  { label: "CRM", icon: "/images/CRM.png" },
  { label: "Projects", icon: "/images/Task.png" },
  { label: "Micro AI", icon: "/images/Document.png" },
];

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-[100px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Floating images */}
        <div className="absolute top-[525px] left-[10px] hidden lg:block">
          <Image
            src="/images/Person.png"
            alt=""
            width={236}
            height={236}
            className="rounded-[20px]"
          />
        </div>
        <div className="absolute right-[55vw] top-[116px] hidden lg:block">
          <Image
            src="/images/Calendar.png"
            alt=""
            width={165}
            height={165}
            className="rounded-[20px]"
          />
        </div>
        <div className="absolute -right-[100px] top-[387px] hidden lg:block">
          <Image
            src="/images/CRM.png"
            alt=""
            width={177}
            height={177}
            className="rounded-[20px]"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-[92px] leading-normal tracking-[-0.05em] text-[var(--white1)]">
            Introducing Micro
          </h2>
          <p className="text-[31px] leading-[36px] text-[var(--white1)] mt-4 font-[family-name:var(--font-playfair)]">
            The all-in-one tool that organizes itself
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-[17px] py-[11px] rounded-full text-[15px] font-medium transition-all duration-500 ${
                activeTab === i
                  ? "bg-[var(--white1)] text-[var(--black1)]"
                  : "border border-[var(--black1)] text-[var(--white1)] hover:border-[var(--white5)]"
              }`}
            >
              <Image
                src={tab.icon}
                alt=""
                width={20}
                height={20}
                className="rounded"
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Screenshot area */}
        <div className="relative max-w-[1100px] mx-auto">
          <div className="relative w-full aspect-[1268/694] rounded-[27px] overflow-hidden bg-[var(--black2)] border border-white/10">
            <Image
              src="/images/desktop-background.png"
              alt="Micro application screenshot"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
