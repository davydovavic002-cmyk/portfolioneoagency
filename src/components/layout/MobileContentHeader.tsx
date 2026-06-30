"use client";

import { ChevronLeft } from "lucide-react";
import type { Language, ViewMode } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { ViewSwitcher } from "./ViewSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileContentHeaderProps {
  strings: UIStrings;
  language: Language;
  viewMode: ViewMode;
  backLabel: string;
  visible: boolean;
  onBack: () => void;
  onViewChange: (mode: ViewMode) => void;
  onLanguageChange: (lang: Language) => void;
}

export function MobileContentHeader({
  strings,
  language,
  viewMode,
  backLabel,
  visible,
  onBack,
  onViewChange,
  onLanguageChange,
}: MobileContentHeaderProps) {
  return (
    <header
      className={`shrink-0 border-b border-white/[0.06] bg-[#080808]/95 px-3 pt-safe-3 pb-3 backdrop-blur-md lg:hidden ${
        visible ? "flex flex-col gap-3" : "hidden"
      }`}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-11 shrink-0 items-center gap-1 rounded-full border border-white/[0.08] px-3 py-2 text-[12px] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel}
        </button>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <ViewSwitcher
            mode={viewMode}
            briefLabel={strings.navBrief}
            workLabel={strings.navWork}
            servicesLabel={strings.navServices}
            aboutLabel={strings.navAbout}
            onChange={onViewChange}
            fullWidth
            compact
          />
        </div>
        <LanguageSwitcher language={language} onChange={onLanguageChange} compact />
      </div>
    </header>
  );
}
