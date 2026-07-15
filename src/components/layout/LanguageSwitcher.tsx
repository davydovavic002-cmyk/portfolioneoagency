"use client";

import type { Language } from "@/lib/types";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "am", label: "Հայերեն" },
];

interface LanguageSwitcherProps {
  language: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

export function LanguageSwitcher({
  language,
  onChange,
  compact = false,
}: LanguageSwitcherProps) {
  return (
    <div
      className={`flex shrink-0 items-center rounded-full border border-line p-0.5 ${compact ? "text-[11px]" : "text-[12px]"}`}
      role="group"
      aria-label="Language"
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-current={language === code ? "true" : undefined}
          aria-label={label}
          className={`rounded-full px-2.5 py-1 font-semibold transition-colors ${
            language === code ? "bg-pink text-white" : "text-muted hover:text-ink"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
