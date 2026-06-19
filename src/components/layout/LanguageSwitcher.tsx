"use client";

import type { Language } from "@/lib/types";

const LANGUAGES: Language[] = ["en", "ru", "am"];

interface LanguageSwitcherProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-3 text-[13px]">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`transition-colors duration-200 ${
            language === lang
              ? "text-zinc-100"
              : "text-zinc-600 hover:text-zinc-400"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
