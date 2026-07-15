"use client";

import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { RetroTv } from "@/components/home/RetroTv";
import { HERO_PILLS } from "@/lib/site-sections";
import { scrollToSection } from "@/lib/scroll-spy";
import type { Language } from "@/lib/types";
import type { UIStrings } from "@/lib/types";

interface MonicaHeroProps {
  language: Language;
  strings: UIStrings;
}

export function MonicaHero({ language, strings }: MonicaHeroProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  return (
    <section className="hero-mesh relative overflow-x-hidden bg-monica-hero pb-10 pt-2 lg:pb-14 lg:pt-4">
      <div
        className="pointer-events-none absolute right-[6%] top-14 z-20 w-28 rotate-6 rounded-sm bg-yellow p-3 shadow-lg ring-1 ring-black/10 sm:right-[8%] lg:top-16"
        aria-hidden
      >
        <p className="font-mono text-[9px] leading-snug text-ink/80">
          {strings.heroStickyLine1}
          <br />
          {strings.heroStickyLine2}
          <br />
          {strings.heroStickyLine3}
        </p>
      </div>

      <div className={`site-container relative z-10 ${fontClass}`}>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="order-2 lg:order-1 lg:pt-6">
            <p className="monica-track text-[11px] text-ink/70 lg:text-xs">Design portfolio</p>
            <h1 className="mt-4 font-display text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold leading-[1.15] tracking-[0.18em] text-ink uppercase">
              Neo
              <br />
              Studio
              <br />
              Space
            </h1>

            <p className="mt-5 max-w-sm text-[15px] font-semibold leading-snug text-ink lg:text-base">
              {strings.heroHeadline}
            </p>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
              {strings.heroTagline}
            </p>

            <div className="hero-cta-row mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => scrollToSection("work")} className="pill-nav !min-h-11">
                {strings.heroCtaWork}
              </button>
              <button type="button" onClick={() => scrollToSection("brief")} className="btn-pink !min-h-11">
                {strings.heroCtaBrief}
              </button>
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !min-h-11"
              >
                {strings.heroCtaContact}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="pointer-events-none mt-5 flex flex-wrap gap-2">
              {HERO_PILLS.map((pill) => (
                <span key={pill} className="hero-pill">
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-1 text-[13px] text-muted">
              <p>
                <span className="font-semibold text-ink">Telegram</span> ·{" "}
                <a
                  href={SITE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink underline-offset-2 hover:underline"
                >
                  {SITE_CONFIG.telegramHandle}
                </a>
              </p>
            </div>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime/30 px-3 py-1.5 text-[12px] font-semibold text-ink">
              <span className="status-pulse h-2 w-2 rounded-full bg-lime" />
              {strings.availability}
            </p>
          </div>

          <div className="order-1 relative z-10 flex w-full min-h-[300px] items-center justify-center py-2 lg:order-2 lg:min-h-0 lg:py-0">
            <RetroTv onOpenWork={() => scrollToSection("work")} livePreviewLabel={strings.livePreview} />
          </div>

          <div className="order-3 flex flex-col items-start justify-center gap-4 lg:items-end lg:pt-6">
            <p
              className="pointer-events-none hidden origin-center rotate-90 whitespace-nowrap font-display text-[11px] font-bold tracking-[0.35em] text-ink/50 uppercase lg:block"
              aria-hidden
            >
              {strings.keepExploring}
            </p>
            <div className="text-left lg:text-right">
              <p className="monica-track text-[10px] text-ink/60 lg:text-[11px]">Design work</p>
              <p className="monica-track mt-2 text-[10px] text-ink/60 lg:text-[11px]">Collection</p>
              <p className="mt-3 max-w-[240px] text-[14px] leading-relaxed text-muted lg:ml-auto">
                {strings.portfolioSubtitle}
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-pink lg:text-5xl">2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
