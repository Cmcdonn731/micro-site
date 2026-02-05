"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const marqueeWords = [
  "AI-Powered",
  "All-In-One Tool",
  "Automatically",
  "Organizes Itself",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 400);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--black2)]"
          exit={{ y: "-110vh" }}
          transition={{ duration: 1.5, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {/* Scrolling marquee behind */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="flex flex-col items-center justify-center h-full gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap text-[10vw] font-bold uppercase text-[var(--white1)] font-[family-name:var(--font-space-mono)]"
                  style={{
                    animation: `marquee-scroll 10s ${i * 1.2}s infinite linear both`,
                  }}
                >
                  {marqueeWords[i % marqueeWords.length]}
                </div>
              ))}
            </div>
          </div>

          {/* Percentage counter */}
          <div className="relative z-10 flex items-baseline font-[family-name:var(--font-outfit)]">
            <span className="text-[80px] font-medium text-[var(--white1)] tabular-nums leading-none">
              {progress}
            </span>
            <span className="text-[40px] font-medium text-[var(--white1)] ml-1">
              %
            </span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 translate-y-[60px] w-[400px] h-[1.5px] bg-[var(--white5)]">
            <motion.div
              className="h-full bg-[var(--white1)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
