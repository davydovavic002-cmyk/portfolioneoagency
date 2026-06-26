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
}

export function AboutView({ language, scrollToSection }: AboutViewProps) {
  const copy = aboutByLanguage[language];
  const isArmenian = language === "am";
  const fontClass = isArmenian ? "font-armenian" : "";

  const sectionScrollClass = (sectionId: AboutSectionId) =>
    scrollToSection === sectionId
      ? "scroll-mt-8 rounded-2xl ring-1 ring-white/[0.08]"
      : "scroll-mt-8";

  return (
    <div
      className={`preview-scroll h-full overflow-y-auto px-5 py-6 pb-12 lg:px-10 lg:py-10 lg:pb-16 ${fontClass}`}
    >
      <header className="mb-8 max-w-2xl lg:mb-12" id="about-top">
        <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-600">
          Neo Studio
        </p>
        <h1 className="font-display mt-3 text-3xl tracking-[-0.02em] text-zinc-50 lg:text-4xl">
          {copy.heroTitle}
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-500 lg:mt-4 lg:text-[14px]">
          {copy.heroSubtitle}
        </p>
      </header>

      <div className="space-y-12 lg:space-y-16">
        {/* Studio */}
        <section
          id="about-studio"
          className={sectionScrollClass("studio")}
        >
          <SectionHeader label={copy.sections.studio} title={copy.studio.title} />
          <div className="mt-6 space-y-4 max-w-2xl">
            {copy.studio.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[14px] leading-relaxed text-zinc-400">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 max-w-lg sm:gap-4">
            {copy.studio.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4"
              >
                <p
                  className="font-display text-xl tracking-tight sm:text-2xl"
                  style={{ color: ABOUT_ACCENT }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">{stat.label}</p>
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
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-zinc-500">
            {copy.process.subtitle}
          </p>
          <ol className="mt-8 space-y-0">
            {copy.process.steps.map((step, i) => (
              <li
                key={step.id}
                className="group relative flex gap-6 border-t border-white/[0.06] py-6 first:border-t-0 first:pt-0"
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
                  <h3 className="font-display text-lg text-zinc-100">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
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
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-zinc-500">
            {copy.reviews.subtitle}
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {copy.reviews.items.map((item, i) => (
              <article
                key={item.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-md ${
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
                  <h3 className="font-display text-lg text-zinc-100">{item.author}</h3>
                  <p className="mt-1 text-[12px] text-zinc-500">{item.role}</p>
                  <p
                    className={`mt-4 leading-relaxed text-zinc-400 ${
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
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-zinc-500">
            {copy.contact.subtitle}
          </p>
          <div className="relative mt-8 max-w-md overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04] p-8 backdrop-blur-xl">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: ABOUT_ACCENT }}
            />
            <div className="relative space-y-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                  {copy.contact.telegramLabel}
                </p>
                <a
                  href={SITE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-display text-xl text-zinc-100 transition-colors hover:text-white"
                >
                  {SITE_CONFIG.telegramHandle}
                  <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                </a>
              </div>
              <div className="space-y-1 border-t border-white/[0.06] pt-5">
                <p className="text-[12px] text-zinc-500">{copy.contact.responseTime}</p>
                <p className="text-[12px] text-zinc-600">{copy.contact.timezone}</p>
              </div>
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-[12px] font-medium tracking-wide text-zinc-100 transition-all hover:border-white/25 hover:bg-white/[0.1]"
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
    <div className="border-b border-white/[0.06] pb-4">
      <p
        className="text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ color: ABOUT_ACCENT }}
      >
        {label}
      </p>
      <h2 className="font-display mt-1 text-2xl text-zinc-100">{title}</h2>
    </div>
  );
}
