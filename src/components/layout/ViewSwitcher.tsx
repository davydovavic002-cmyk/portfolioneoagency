"use client";

import type { ViewMode } from "@/lib/types";

interface ViewSwitcherProps {
  mode: ViewMode;
  briefLabel: string;
  workLabel: string;
  servicesLabel: string;
  aboutLabel: string;
  onChange: (mode: ViewMode) => void;
  fullWidth?: boolean;
  compact?: boolean;
}

const TABS: { id: ViewMode; key: "brief" | "work" | "services" | "about" }[] = [
  { id: "brief", key: "brief" },
  { id: "work", key: "work" },
  { id: "services", key: "services" },
  { id: "about", key: "about" },
];

export function ViewSwitcher({
  mode,
  briefLabel,
  workLabel,
  servicesLabel,
  aboutLabel,
  onChange,
  fullWidth = false,
  compact = false,
}: ViewSwitcherProps) {
  const labels = {
    brief: briefLabel,
    work: workLabel,
    services: servicesLabel,
    about: aboutLabel,
  };

  return (
    <div
      role="tablist"
      aria-label="Main navigation"
      className={`flex gap-1 rounded-full border border-black/12 bg-paper p-1 shadow-[0_1px_0_rgba(0,0,0,0.04)] ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {TABS.map(({ id, key }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={mode === id}
          onClick={() => onChange(id)}
          className={`rounded-full font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
            fullWidth
              ? `flex-1 px-1.5 text-center ${compact ? "min-h-10 py-2 text-[9px] leading-none" : "py-1.5 text-[10px] sm:px-2 sm:text-[11px]"}`
              : "min-h-10 px-3 py-2 text-[11px]"
          } ${
            mode === id
              ? "bg-accent text-white shadow-sm"
              : "text-muted hover:bg-accent-soft hover:text-ink"
          }`}
        >
          {labels[key]}
        </button>
      ))}
    </div>
  );
}
