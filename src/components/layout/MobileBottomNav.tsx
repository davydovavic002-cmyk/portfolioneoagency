"use client";

import { Briefcase, FileText, Sparkles, User } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-spy";
import type { SiteSectionId } from "@/lib/site-sections";
import type { UIStrings } from "@/lib/types";

const ITEMS: {
  id: SiteSectionId;
  key: keyof Pick<UIStrings, "navWork" | "navServices" | "navBrief" | "navAbout">;
  icon: typeof Briefcase;
  primary?: boolean;
}[] = [
  { id: "work", key: "navWork", icon: Briefcase },
  { id: "services", key: "navServices", icon: Sparkles },
  { id: "brief", key: "navBrief", icon: FileText, primary: true },
  { id: "about", key: "navAbout", icon: User },
];

interface MobileBottomNavProps {
  activeSection: string;
  strings: UIStrings;
}

export function MobileBottomNav({ activeSection, strings }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 pt-2 pb-safe-8">
        {ITEMS.map(({ id, key, icon: Icon, primary }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={isActive ? "true" : undefined}
              className={`flex min-h-11 min-w-[4.5rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors ${
                primary
                  ? isActive
                    ? "bg-pink text-white shadow-[0_4px_16px_-4px_rgba(255,77,158,0.6)]"
                    : "bg-pink/15 text-pink"
                  : isActive
                    ? "bg-pink/10 text-pink"
                    : "text-muted hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              <span className="text-[10px] font-bold leading-none tracking-wide">
                {strings[key]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
