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
      className={`flex gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 ${
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
          className={`rounded-full py-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
            fullWidth ? "flex-1 px-1.5 text-center text-[10px] sm:px-2 sm:text-[11px]" : "px-3 text-[11px]"
          } ${
            mode === id
              ? "bg-white text-black"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {labels[key]}
        </button>
      ))}
    </div>
  );
}
