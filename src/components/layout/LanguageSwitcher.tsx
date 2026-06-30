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
      className={`flex shrink-0 items-center text-[13px] ${
        compact ? "gap-1" : "gap-3"
      }`}
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
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
            compact ? "px-2 text-[11px]" : "px-2.5"
          } ${
            language === code
              ? "bg-white/[0.08] text-zinc-100"
              : "text-zinc-600 hover:bg-white/[0.04] hover:text-zinc-400"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
