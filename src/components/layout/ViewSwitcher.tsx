"use client";

import type { ViewMode } from "@/lib/types";

interface ViewSwitcherProps {
  mode: ViewMode;
  workLabel: string;
  servicesLabel: string;
  onChange: (mode: ViewMode) => void;
}

export function ViewSwitcher({
  mode,
  workLabel,
  servicesLabel,
  onChange,
}: ViewSwitcherProps) {
  return (
    <div className="flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      {(
        [
          { id: "work" as const, label: workLabel },
          { id: "services" as const, label: servicesLabel },
        ] as const
      ).map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full px-4 py-1.5 text-[12px] transition-all duration-200 ${
            mode === id
              ? "bg-white text-black"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
