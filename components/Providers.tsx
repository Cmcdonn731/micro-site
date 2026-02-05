"use client";

import { LenisProvider } from "@/lib/lenis";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
