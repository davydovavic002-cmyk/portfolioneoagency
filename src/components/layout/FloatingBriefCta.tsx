"use client";

import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-spy";
import type { UIStrings } from "@/lib/types";

interface FloatingBriefCtaProps {
  visible: boolean;
  strings: UIStrings;
}

export function FloatingBriefCta({ visible, strings }: FloatingBriefCtaProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToSection("brief")}
      className="floating-brief-cta btn-pink pointer-events-auto fixed z-50 hidden shadow-lg lg:inline-flex"
    >
      {strings.heroCtaBrief}
      <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}
