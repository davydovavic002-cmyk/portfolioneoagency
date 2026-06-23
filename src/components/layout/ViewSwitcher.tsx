"use client";

import type { ViewMode } from "@/lib/types";

interface ViewSwitcherProps {
  mode: ViewMode;
  workLabel: string;
  servicesLabel: string;
  aboutLabel: string;
  onChange: (mode: ViewMode) => void;
}

const TABS: { id: ViewMode; key: "work" | "services" | "about" }[] = [
  { id: "work", key: "work" },
  { id: "services", key: "services" },
  { id: "about", key: "about" },
];

export function ViewSwitcher({
  mode,
  workLabel,
  servicesLabel,
  aboutLabel,
  onChange,
}: ViewSwitcherProps) {
  const labels = {
    work: workLabel,
    services: servicesLabel,
    about: aboutLabel,
  };

  return (
    <div className="flex gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      {TABS.map(({ id, key }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full px-3 py-1.5 text-[11px] transition-all duration-200 ${
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
