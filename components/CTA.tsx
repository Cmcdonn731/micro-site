"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="waitlist" className="relative py-[100px]">
      {/* Gradient ring background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border-[50px] border-transparent opacity-20 bg-gradient-to-b from-[#ae86ad40] via-[#eaa04e40] to-[#37979040]" />
      </div>

      <div className="relative z-10 text-center max-w-[700px] mx-auto px-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-[72px] leading-[100%] tracking-[-0.05em] text-[var(--white1)] mb-12">
          Apply Now to be part of the closed beta
        </h3>
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-[var(--black1)] px-[38px] py-[22px] rounded-full text-[15px] font-medium hover:opacity-90 transition-opacity"
          style={{
            background:
              "linear-gradient(91deg, #ae86ad 0.24%, #eaa04e 13.8%, #5197b2 35.34%, #e4bf66 55.55%, #379790 96.24%)",
          }}
        >
          Join the Waitlist
          <Image
            src="/images/arrow.f400b257.svg"
            alt=""
            width={8}
            height={8}
            className="opacity-70"
          />
        </Link>
      </div>
    </section>
  );
}
