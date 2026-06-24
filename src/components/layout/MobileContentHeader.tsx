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
  onBack: () => void;
  onViewChange: (mode: ViewMode) => void;
  onLanguageChange: (lang: Language) => void;
}

export function MobileContentHeader({
  strings,
  language,
  viewMode,
  backLabel,
  onBack,
  onViewChange,
  onLanguageChange,
}: MobileContentHeaderProps) {
  return (
    <header className="shrink-0 border-b border-white/[0.06] bg-[#080808]/95 px-4 py-3 backdrop-blur-md safe-top">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.08] px-3 py-1.5 text-[12px] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel}
        </button>
        <div className="min-w-0 flex-1">
          <ViewSwitcher
            mode={viewMode}
            workLabel={strings.navWork}
            servicesLabel={strings.navServices}
            aboutLabel={strings.navAbout}
            onChange={onViewChange}
            fullWidth
          />
        </div>
        <LanguageSwitcher language={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}
