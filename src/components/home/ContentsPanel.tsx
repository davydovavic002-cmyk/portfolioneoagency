"use client";

import { SITE_CONFIG } from "@/config/site";
import { scrollToSection } from "@/lib/scroll-spy";
import { SITE_SECTIONS } from "@/lib/site-sections";
import type { Language } from "@/lib/types";
import type { UIStrings } from "@/lib/types";

const ITEMS: {
  id: (typeof SITE_SECTIONS)[number];
  key: keyof Pick<UIStrings, "navWork" | "navServices" | "navBrief" | "navAbout">;
  hintKey: keyof Pick<
    UIStrings,
    "contentsWorkHint" | "contentsServicesHint" | "contentsBriefHint" | "contentsAboutHint"
  >;
  emoji: string;
  angle: string;
}[] = [
  {
    id: "work",
    key: "navWork",
    hintKey: "contentsWorkHint",
    emoji: "🪑",
    angle: "-rotate-6 sm:-rotate-12 sm:-translate-x-2",
  },
  {
    id: "services",
    key: "navServices",
    hintKey: "contentsServicesHint",
    emoji: "🍏",
    angle: "rotate-3 sm:rotate-6 sm:translate-x-1",
  },
  {
    id: "brief",
    key: "navBrief",
    hintKey: "contentsBriefHint",
    emoji: "🛍",
    angle: "-rotate-2 sm:-rotate-3",
  },
  {
    id: "about",
    key: "navAbout",
    hintKey: "contentsAboutHint",
    emoji: "✿",
    angle: "rotate-6 sm:rotate-12 sm:translate-x-2",
  },
];

interface ContentsPanelProps {
  language: Language;
  strings: UIStrings;
  activeSection: string;
}

export function ContentsPanel({ language, strings, activeSection }: ContentsPanelProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  return (
    <section className="contents-panel relative z-10 overflow-hidden bg-pink py-12 lg:py-20">
      <div className="pointer-events-none absolute -left-8 top-12 h-24 w-16 rotate-12 bg-lime/40" aria-hidden />
      <div className="pointer-events-none absolute -right-6 bottom-16 h-20 w-28 -rotate-6 bg-yellow/50" aria-hidden />

      <div className={`site-container relative ${fontClass}`}>
        <div>
          <h2 className="font-display text-[clamp(2.75rem,12vw,6rem)] font-bold leading-none text-white">
            Contents
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/85">
            {strings.servicesCtaBrief}
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-xl lg:mt-14">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-36 w-1 -translate-x-1/2 -translate-y-full rounded-full bg-white/35 lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-1 w-28 -translate-x-full -translate-y-1/2 rounded-full bg-white/35 lg:block" />

          <div className="relative z-20 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-y-12">
            {ITEMS.map(({ id, key, hintKey, emoji, angle }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`contents-nav-item group relative flex min-h-[5.5rem] flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.98] ${angle}`}
                >
                  <span className="pointer-events-none text-3xl drop-shadow-sm lg:text-4xl">{emoji}</span>
                  <span
                    className={`pointer-events-none rounded-full px-3 py-2 text-center font-display text-xs font-bold uppercase tracking-[0.1em] transition-colors sm:px-4 sm:text-sm sm:tracking-[0.12em] ${
                      isActive
                        ? "bg-white text-pink shadow-md"
                        : "bg-white/15 text-white group-hover:bg-white/25"
                    }`}
                  >
                    {strings[key]}
                  </span>
                  <span className="pointer-events-none max-w-[9rem] text-center text-[11px] leading-snug text-white/75">
                    {strings[hintKey]}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 whitespace-pre-line text-center font-display text-2xl font-extrabold leading-tight tracking-tight text-white/25 lg:block">
            {SITE_CONFIG.brandName.split(" ").join("\n")}
          </p>
        </div>

        <p className="mt-10 text-center text-[13px] font-medium tracking-[0.2em] text-white/70 uppercase">
          {strings.keepExploring}
        </p>
      </div>
    </section>
  );
}
