"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { NeoLogo } from "@/components/brand/NeoLogo";
import { SITE_CONFIG } from "@/config/site";
import { scrollToSection } from "@/lib/scroll-spy";
import type { Language } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { aboutByLanguage } from "@/lib/i18n/about";

interface StudioHeroProps {
  language: Language;
  strings: UIStrings;
}

export function StudioHero({ language, strings }: StudioHeroProps) {
  const fontClass = language === "am" ? "font-armenian" : "";
  const stats = aboutByLanguage[language].studio.stats;

  return (
    <section className="relative overflow-hidden pb-4 pt-12 lg:pb-8 lg:pt-20">
      <div className="site-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={fontClass}
          >
            <NeoLogo size={36} showWordmark className="mb-8" />

            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/70 px-4 py-2 text-[13px] text-muted shadow-sm ring-1 ring-black/[0.05]">
              <span className="live-dot" aria-hidden />
              {strings.availability}
            </div>

            <h1 className="display-hero max-w-[14ch]">
              Products <em>engineered</em> to ship
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-[1.7] text-muted">
              {strings.heroTagline}. {strings.portfolioSubtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => scrollToSection("work")} className="btn-primary">
                {strings.navWork}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollToSection("brief")} className="btn-ghost">
                {strings.navBrief}
              </button>
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Telegram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel relative overflow-hidden p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />

            <p className="relative text-[13px] font-medium text-muted">{SITE_CONFIG.brandName}</p>
            <p className={`relative mt-3 font-display text-3xl leading-tight tracking-[-0.02em] text-ink lg:text-4xl ${fontClass}`}>
              Full-stack studio for founders who care about craft
            </p>
            <p className="relative mt-4 text-[14px] leading-relaxed text-muted">
              Live portfolio, transparent pricing, production-ready delivery — from landing pages to AI products.
            </p>

            <div className="relative mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/80 px-3 py-4 ring-1 ring-black/[0.04]">
                  <p className="text-2xl font-semibold tracking-tight text-accent">{stat.value}</p>
                  <p className={`mt-1 text-[11px] leading-snug text-muted ${fontClass}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
