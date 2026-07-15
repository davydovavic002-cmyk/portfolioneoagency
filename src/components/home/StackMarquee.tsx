"use client";

import { STACK_MARQUEE } from "@/lib/site-sections";

export function StackMarquee() {
  const items = [...STACK_MARQUEE, ...STACK_MARQUEE];

  return (
    <div className="stack-marquee relative overflow-hidden border-y border-pink/15 bg-ink py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
