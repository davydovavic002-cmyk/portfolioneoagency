"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import type { ServiceItem } from "@/lib/i18n/services";
import type { ServicesCopy } from "@/lib/i18n/services";

interface ServiceCardProps {
  item: ServiceItem;
  copy: ServicesCopy;
  accent: string;
  featured?: boolean;
}

export function ServiceCard({
  item,
  copy,
  accent,
  featured = false,
}: ServiceCardProps) {
  return (
    <motion.article
      layout
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
        featured
          ? "border-white/[0.12] bg-white/[0.04] p-8 backdrop-blur-xl"
          : "border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-md hover:border-white/[0.12] hover:bg-white/[0.04]"
      }`}
      style={{
        boxShadow: featured
          ? `0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px -24px ${accent}33`
          : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: accent }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-[-0.01em] text-zinc-50">
            {item.name}
          </h3>
          {item.audience && (
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">
              <span className="text-zinc-600">{copy.forWhom}: </span>
              {item.audience}
            </p>
          )}
        </div>
        <p
          className="shrink-0 font-display text-2xl tracking-tight text-zinc-100"
          style={{ color: featured ? accent : undefined }}
        >
          {item.price}
        </p>
      </div>

      <p className="relative mt-4 text-[13px] leading-relaxed text-zinc-400">
        {item.description}
      </p>

      {item.timeline && (
        <p className="relative mt-3 text-[11px] uppercase tracking-widest text-zinc-600">
          {copy.timeline}: {item.timeline}
        </p>
      )}

      <div className="relative mt-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
          {copy.includes}
        </p>
        <ul className="mt-3 space-y-2">
          {item.deliverables.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-[12px] leading-relaxed text-zinc-400"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
              {line}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={SITE_CONFIG.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all ${
          featured
            ? "border-white/[0.14] bg-white/[0.06] text-zinc-100 hover:border-white/25 hover:bg-white/[0.1]"
            : "border-white/[0.08] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"
        }`}
      >
        {copy.bookCall}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </motion.article>
  );
}
