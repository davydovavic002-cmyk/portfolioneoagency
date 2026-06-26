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
}

export function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  return (
    <div
      className="flex items-center gap-3 text-[13px]"
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
          className={`transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
            language === code
              ? "text-zinc-100"
              : "text-zinc-600 hover:text-zinc-400"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
