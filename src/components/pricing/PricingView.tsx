"use client";

import { SITE_CONFIG } from "@/config/site";
import type { Language } from "@/lib/types";
import {
  servicesByLanguage,
  TIER_ACCENTS,
  type ServiceTierId,
} from "@/lib/i18n/services";
import { ServiceCard } from "./ServiceCard";
import type { ServiceItemId } from "@/lib/project-packages";
import { serviceItemElementId } from "@/lib/project-packages";

interface PricingViewProps {
  language: Language;
  scrollToTier?: ServiceTierId | null;
  scrollToServiceItem?: ServiceItemId | null;
  embedded?: boolean;
}

export function PricingView({
  language,
  scrollToTier,
  scrollToServiceItem,
  embedded = false,
}: PricingViewProps) {
  const copy = servicesByLanguage[language];
  const isArmenian = language === "am";

  return (
    <div className={isArmenian ? "font-armenian" : ""}>
      {!embedded && (
        <header className="mb-8 max-w-2xl lg:mb-12" id="pricing-top">
          <p className="section-label">{SITE_CONFIG.brandName} · B2B</p>
          <h1 className="section-title mt-3">{copy.heroTitle}</h1>
          <p className="section-subtitle">{copy.heroSubtitle}</p>
        </header>
      )}

      <div className="space-y-12 lg:space-y-16">
        {copy.tiers.map((tier) => (
          <section
            key={tier.id}
            id={`tier-${tier.id}`}
            className={
              scrollToTier === tier.id
                ? "scroll-mt-8 rounded-2xl ring-1 ring-accent/20"
                : "scroll-mt-8"
            }
          >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: TIER_ACCENTS[tier.id] }}
                >
                  {tier.level}
                </p>
                <h2 className="font-display mt-1 text-2xl text-ink">
                  {tier.title}
                </h2>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
                  {tier.subtitle}
                </p>
              </div>
            </div>

            <div
              className={
                tier.id === "packages"
                  ? "grid gap-5 lg:grid-cols-3"
                  : tier.id === "retainer"
                    ? "grid gap-5 lg:grid-cols-2"
                    : "grid gap-4"
              }
            >
              {tier.items.map((item) => (
                <div
                  key={item.id}
                  id={serviceItemElementId(item.id)}
                  className={`scroll-mt-8 ${
                    scrollToServiceItem === (item.id as ServiceItemId)
                      ? "rounded-2xl ring-1 ring-white/[0.14]"
                      : ""
                  }`}
                >
                  <ServiceCard
                    item={item}
                    copy={copy}
                    accent={TIER_ACCENTS[tier.id]}
                    featured={!!item.featured}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
