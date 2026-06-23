"use client";

import type { Language } from "@/lib/types";
import {
  servicesByLanguage,
  TIER_ACCENTS,
  type ServiceTierId,
} from "@/lib/i18n/services";
import { ServiceCard } from "./ServiceCard";

interface PricingViewProps {
  language: Language;
  scrollToTier?: ServiceTierId | null;
}

export function PricingView({ language, scrollToTier }: PricingViewProps) {
  const copy = servicesByLanguage[language];
  const isArmenian = language === "am";

  return (
    <div
      className={`preview-scroll h-full overflow-y-auto px-10 py-10 pb-16 ${isArmenian ? "font-armenian" : ""}`}
    >
      <header className="mb-12 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-600">
          Neo Studio · B2B
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-[-0.02em] text-zinc-50">
          {copy.heroTitle}
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-zinc-500">
          {copy.heroSubtitle}
        </p>
      </header>

      <div className="space-y-16">
        {copy.tiers.map((tier) => (
          <section
            key={tier.id}
            id={`tier-${tier.id}`}
            className={
              scrollToTier === tier.id
                ? "scroll-mt-8 rounded-2xl ring-1 ring-white/[0.08]"
                : "scroll-mt-8"
            }
          >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: TIER_ACCENTS[tier.id] }}
                >
                  {tier.level}
                </p>
                <h2 className="font-display mt-1 text-2xl text-zinc-100">
                  {tier.title}
                </h2>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-zinc-500">
                  {tier.subtitle}
                </p>
              </div>
            </div>

            <div
              className={
                tier.id === "packages" || tier.id === "retainer"
                  ? "grid gap-5 lg:grid-cols-2"
                  : "grid gap-4"
              }
            >
              {tier.items.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  copy={copy}
                  accent={TIER_ACCENTS[tier.id]}
                  featured={!!item.featured}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
