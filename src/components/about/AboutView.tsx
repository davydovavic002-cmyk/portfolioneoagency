"use client";

import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import {
  aboutByLanguage,
  ABOUT_ACCENT,
  type AboutSectionId,
} from "@/lib/i18n/about";
import type { Language } from "@/lib/types";

interface AboutViewProps {
  language: Language;
  scrollToSection?: AboutSectionId | null;
  embedded?: boolean;
}

export function AboutView({ language, scrollToSection, embedded = false }: AboutViewProps) {
  const copy = aboutByLanguage[language];
  const isArmenian = language === "am";
  const fontClass = isArmenian ? "font-armenian" : "";

  const sectionScrollClass = (sectionId: AboutSectionId) =>
    scrollToSection === sectionId
      ? "scroll-mt-8 rounded-2xl ring-1 ring-accent/20"
      : "scroll-mt-8";

  return (
    <div className={fontClass}>
      {!embedded && (
        <header className="mb-8 max-w-2xl lg:mb-12" id="about-top">
          <p className="section-label">{SITE_CONFIG.brandName}</p>
          <h1 className="section-title mt-3">{copy.heroTitle}</h1>
          <p className="section-subtitle">{copy.heroSubtitle}</p>
        </header>
      )}

      <div className="space-y-12 lg:space-y-16">
        {/* Studio */}
        <section
          id="about-studio"
          className={sectionScrollClass("studio")}
        >
          <SectionHeader label={copy.sections.studio} title={copy.studio.title} />
          <div className="mt-6 space-y-4 max-w-2xl">
            {copy.studio.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[14px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 max-w-lg sm:gap-4">
            {copy.studio.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-black/10 bg-accent-soft px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4"
              >
                <p
                  className="font-display text-xl tracking-tight sm:text-2xl"
                  style={{ color: ABOUT_ACCENT }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section
          id="about-process"
          className={sectionScrollClass("process")}
        >
          <SectionHeader label={copy.sections.process} title={copy.process.title} />
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted">
            {copy.process.subtitle}
          </p>
          <ol className="mt-8 space-y-0">
            {copy.process.steps.map((step, i) => (
              <li
                key={step.id}
                className="group relative flex gap-6 border-t border-black/10 py-6 first:border-t-0 first:pt-0"
              >
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] tabular-nums"
                  style={{
                    borderColor: `${ABOUT_ACCENT}44`,
                    color: ABOUT_ACCENT,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pb-1">
                  <h3 className="font-display text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Deliveries */}
        <section
          id="about-reviews"
          className={sectionScrollClass("reviews")}
        >
          <SectionHeader label={copy.sections.reviews} title={copy.reviews.title} />
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted">
            {copy.reviews.subtitle}
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {copy.reviews.items.map((item, i) => (
              <article
                key={item.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-accent-soft p-6 backdrop-blur-md ${
                  i === 0 ? "lg:col-span-2 lg:p-8" : ""
                }`}
                style={
                  i === 0
                    ? {
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px -24px ${ABOUT_ACCENT}33`,
                      }
                    : undefined
                }
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-15 blur-3xl"
                  style={{ backgroundColor: ABOUT_ACCENT }}
                />
                <span
                  className="relative mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider"
                  style={{
                    borderColor: `${ABOUT_ACCENT}44`,
                    color: ABOUT_ACCENT,
                  }}
                >
                  {item.highlight}
                </span>
                <div className="relative flex-1">
                  <h3 className="font-display text-lg text-ink">{item.author}</h3>
                  <p className="mt-1 text-[12px] text-muted">{item.role}</p>
                  <p
                    className={`mt-4 leading-relaxed text-muted ${
                      i === 0 ? "text-[15px]" : "text-[14px]"
                    }`}
                  >
                    {item.quote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="about-contact"
          className={sectionScrollClass("contact")}
        >
          <SectionHeader label={copy.sections.contact} title={copy.contact.title} />
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted">
            {copy.contact.subtitle}
          </p>
          <div className="relative mt-8 max-w-md overflow-hidden rounded-2xl border border-black/12 bg-accent-soft p-8 backdrop-blur-xl">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: ABOUT_ACCENT }}
            />
            <div className="relative space-y-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                  {copy.contact.telegramLabel}
                </p>
                <a
                  href={SITE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-display text-xl text-ink transition-colors hover:text-accent"
                >
                  {SITE_CONFIG.telegramHandle}
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </a>
              </div>
              <div className="space-y-1 border-t border-black/10 pt-5">
                <p className="text-[12px] text-muted">{copy.contact.responseTime}</p>
                <p className="text-[12px] text-faint">{copy.contact.timezone}</p>
              </div>
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12px] font-medium tracking-wide text-white transition-all hover:bg-accent/90"
              >
                {copy.contact.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="border-b border-black/10 pb-4">
      <p
        className="text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ color: ABOUT_ACCENT }}
      >
        {label}
      </p>
      <h2 className="font-display mt-1 text-2xl text-ink">{title}</h2>
    </div>
  );
}
