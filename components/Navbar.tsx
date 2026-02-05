"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="flex items-center justify-between px-8 py-6 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <svg
            width="95"
            height="24"
            viewBox="0 0 95 24"
            fill="none"
            className="text-[var(--white1)]"
          >
            <text
              x="0"
              y="20"
              fill="currentColor"
              fontSize="20"
              fontWeight="500"
              fontFamily="var(--font-outfit)"
            >
              micro
            </text>
          </svg>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-[15px] font-medium text-[var(--white1)] tracking-[-0.03em] hover:opacity-70 transition-opacity"
          >
            Login
          </Link>
          <Link
            href="#waitlist"
            className="flex items-center gap-2 bg-[var(--white2)] text-[var(--black1)] px-7 py-[15px] rounded-full text-[15px] font-medium tracking-[-0.03em] hover:opacity-90 transition-opacity"
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
      </nav>
    </header>
  );
}
