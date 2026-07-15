"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NeoLogo } from "@/components/brand/NeoLogo";
import { SITE_CONFIG } from "@/config/site";
import { SITE_SECTIONS, type SiteSectionId } from "@/lib/site-sections";
import { scrollToSection, scrollToTop } from "@/lib/scroll-spy";
import type { Language } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface SiteHeaderProps {
  language: Language;
  activeSection: string;
  strings: UIStrings;
  onLanguageChange: (lang: Language) => void;
}

const NAV: { id: SiteSectionId; key: keyof Pick<UIStrings, "navWork" | "navServices" | "navBrief" | "navAbout"> }[] = [
  { id: "work", key: "navWork" },
  { id: "services", key: "navServices" },
  { id: "brief", key: "navBrief" },
  { id: "about", key: "navAbout" },
];

export function SiteHeader({
  language,
  activeSection,
  strings,
  onLanguageChange,
}: SiteHeaderProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-monica-hero/95 backdrop-blur-md">
      <div className={`site-container ${fontClass}`}>
        <div className="flex items-center gap-3 py-4 lg:gap-4 lg:py-5">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex shrink-0 flex-col text-left"
            aria-label={SITE_CONFIG.brandName}
          >
            <span className="monica-track text-[10px] text-ink lg:text-[11px]">Design</span>
            <span className="monica-track text-[10px] text-ink lg:text-[11px]">Portfolio</span>
          </button>

          <nav aria-label="Primary" className="tab-nav ml-auto hidden lg:flex lg:gap-8">
            {NAV.map(({ id, key }) => (
              <button
                key={id}
                type="button"
                data-active={activeSection === id}
                onClick={() => scrollToSection(id)}
              >
                {strings[key]}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <LanguageSwitcher language={language} onChange={onLanguageChange} compact />
            <button
              type="button"
              onClick={() => scrollToSection("brief")}
              className="btn-pink hidden !min-h-10 !py-2 !text-[12px] sm:inline-flex"
            >
              {strings.heroCtaBrief}
            </button>
            <a
              href={SITE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline hidden !min-h-10 !py-2 !text-[12px] md:inline-flex"
            >
              {strings.navContact}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <nav
          aria-label="Section shortcuts"
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide lg:hidden"
        >
          {NAV.map(({ id, key }) => (
            <button
              key={id}
              type="button"
              data-active={activeSection === id}
              onClick={() => scrollToSection(id)}
              className="pill-nav shrink-0 !min-h-10 !px-4 !text-[12px]"
            >
              {strings[key]}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

interface SiteFooterProps {
  language: Language;
  strings: UIStrings;
}

export function SiteFooter({ language, strings }: SiteFooterProps) {
  const fontClass = language === "am" ? "font-armenian" : "";
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-canvas ${fontClass}`}>
      <div className="site-container py-12 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-kicker">{strings.navBrief}</p>
            <p className="mt-1 max-w-md text-[14px] leading-relaxed text-muted">
              {strings.servicesCtaBrief}
            </p>
          </div>
          <button type="button" onClick={() => scrollToSection("brief")} className="btn-pink shrink-0">
            {strings.heroCtaBrief}
          </button>
        </div>

        <div className="bento-grid sm:grid-cols-3">
          <a
            href={SITE_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-cell bento-pink flex min-h-[140px] flex-col justify-between p-6 transition hover:scale-[1.02] hover:shadow-lg"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/70">
              {strings.navContact}
            </span>
            <span className="font-display text-lg font-bold text-white">{SITE_CONFIG.telegramHandle}</span>
            <ArrowUpRight className="h-5 w-5 text-white/80" />
          </a>

          <div className="bento-cell bento-lime flex min-h-[140px] flex-col justify-between p-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-ink/60">Status</span>
            <span className="font-display text-lg font-bold text-ink">{strings.availability}</span>
            <span className="text-[13px] font-medium text-ink/70">neostudio.space</span>
          </div>

          <div className="bento-cell bento-yellow flex min-h-[140px] flex-col justify-between p-6">
            <NeoLogo size={28} showWordmark />
            <p className="text-[13px] font-medium text-ink/75">{strings.portfolioSubtitle}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[12px] text-faint">
          <p>
            © {year} {SITE_CONFIG.brandName}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/web-design" className="font-semibold hover:text-pink">
              Web design
            </Link>
            <Link href="/services/landing-page" className="font-semibold hover:text-pink">
              Landing
            </Link>
            <Link href="/services/telegram-bot" className="font-semibold hover:text-pink">
              Telegram
            </Link>
            <Link href="/services/ai-automation" className="font-semibold hover:text-pink">
              AI
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
