"use client";

import { ArrowDownRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { scrollToSection } from "@/lib/scroll-spy";
import { SITE_SECTIONS } from "@/lib/site-sections";
import type { Language } from "@/lib/types";
import type { UIStrings } from "@/lib/types";

const TAGS = [
  "#Full_stack",
  "#AI_engineering",
  "#Product_design",
  "#Telegram_bots",
  "#Next.js",
  "#Live_previews",
];

interface HeroBentoProps {
  language: Language;
  strings: UIStrings;
  activeSection: string;
}

const SECTION_LABEL: Record<(typeof SITE_SECTIONS)[number], string> = {
  work: "navWork",
  services: "navServices",
  brief: "navBrief",
  about: "navAbout",
};

function sectionLabel(id: (typeof SITE_SECTIONS)[number], strings: UIStrings): string {
  const key = SECTION_LABEL[id];
  return strings[key as keyof UIStrings] as string;
}

export function HeroBento({ language, strings, activeSection }: HeroBentoProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  return (
    <section className="pt-6 lg:pt-10">
      <div className={`site-container ${fontClass}`}>
        <div className="bento-grid lg:grid-cols-12">
          {/* Left — tags + arrow (ref Qorry) */}
          <div className="bento-cell bento-white flex flex-col justify-between p-6 lg:col-span-5 lg:min-h-[340px] lg:p-8">
            <ArrowDownRight
              className="h-14 w-14 stroke-[2.5] text-ink lg:h-20 lg:w-20"
              aria-hidden
            />
            <ul className="tag-list mt-8 lg:mt-auto">
              {TAGS.map((tag) => (
                <li key={tag}>{tag.replace(/_/g, " ")}</li>
              ))}
            </ul>
          </div>

          {/* Right — blue block (ref PORTFOLIO tile) */}
          <div className="bento-cell bento-blue relative flex min-h-[280px] flex-col justify-between p-6 lg:col-span-7 lg:min-h-[340px] lg:p-8">
            <p className="text-[13px] font-medium text-white/70">{SITE_CONFIG.brandName}</p>
            <div className="my-4 select-none lg:my-0">
              <p className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white">
                Neo
              </p>
              <p className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white/90">
                Studio
              </p>
              <p className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white/75">
                Space
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-xs text-[14px] leading-relaxed text-white/75">
                {strings.heroTagline}
              </p>
              <span className="text-4xl font-bold tracking-tighter text-white lg:text-5xl">2026</span>
            </div>
          </div>
        </div>

        {/* Pill nav — ref mobile .01 grid */}
        <div className="pill-grid mt-3 lg:mt-4">
          {SITE_SECTIONS.map((id) => (
            <button
              key={id}
              type="button"
              data-active={activeSection === id}
              onClick={() => scrollToSection(id)}
              className="pill-nav"
            >
              {sectionLabel(id, strings)}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <span className="inline-flex items-center gap-2 text-[13px] text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {strings.availability}
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <p className="text-[14px] text-muted">{strings.portfolioSubtitle}</p>
        </div>
      </div>
    </section>
  );
}
