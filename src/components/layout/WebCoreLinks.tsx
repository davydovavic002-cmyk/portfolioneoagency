"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import type { Language, ViewMode } from "@/lib/types";
import type { UIStrings } from "@/lib/types";

interface WebCoreLinksProps {
  language: Language;
  viewMode: ViewMode;
  strings: UIStrings;
  onViewChange: (mode: ViewMode) => void;
}

interface LinkRow {
  id: string;
  label: string;
  hint?: string;
  href?: string;
  mode?: ViewMode;
  external?: boolean;
}

export function WebCoreLinks({
  language,
  viewMode,
  strings,
  onViewChange,
}: WebCoreLinksProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  const rows: LinkRow[] = [
    {
      id: "brief",
      label: strings.navBrief,
      hint: strings.briefHeroSubtitle,
      mode: "brief",
    },
    {
      id: "work",
      label: strings.navWork,
      hint: strings.portfolioSubtitle,
      mode: "work",
    },
    {
      id: "services",
      label: strings.navServices,
      hint: strings.navServices,
      mode: "services",
    },
    {
      id: "about",
      label: strings.navAbout,
      hint: strings.navAbout,
      mode: "about",
    },
    {
      id: "telegram",
      label: "Telegram",
      hint: SITE_CONFIG.telegramHandle,
      href: SITE_CONFIG.bookingUrl,
      external: true,
    },
    {
      id: "web-design",
      label: "Web design",
      hint: "Fixed-scope · from $3,500",
      href: "/services/web-design",
    },
    {
      id: "landing",
      label: "Landing page",
      hint: "Essential sites · 8–12 days",
      href: "/services/landing-page",
    },
    {
      id: "telegram-bot",
      label: "Telegram bot",
      hint: "Automation · MVP",
      href: "/services/telegram-bot",
    },
    {
      id: "ai",
      label: "AI automation",
      hint: "Agents · LLM products",
      href: "/services/ai-automation",
    },
  ];

  return (
    <nav
      aria-label="Site navigation"
      className={`mx-auto w-full max-w-3xl px-5 py-6 lg:px-8 ${fontClass}`}
    >
      <p className="section-label mb-4">Explore</p>
      <ul className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-paper">
        {rows.map((row) => {
          const isActive = row.mode === viewMode;
          const inner = (
            <>
              <div className="min-w-0 text-left">
                <p
                  className={`font-display text-xl tracking-[-0.02em] transition-colors lg:text-2xl ${
                    isActive ? "text-accent" : "text-ink group-hover:text-accent"
                  }`}
                >
                  {row.label}
                </p>
                {row.hint && (
                  <p className="mt-1 truncate text-[12px] text-muted">{row.hint}</p>
                )}
              </div>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-black/12 text-muted group-hover:border-accent/30 group-hover:text-accent"
                }`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </>
          );

          return (
            <li key={row.id}>
              {row.href ? (
                <Link
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[72px] cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-accent-soft/50 lg:px-6"
                >
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => row.mode && onViewChange(row.mode)}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-accent-soft/50 lg:px-6"
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
