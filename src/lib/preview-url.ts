import type { Language } from "./types";

export const PORTFOLIO_LANG_MESSAGE = "portfolio:set-language" as const;

export function buildPreviewUrl(baseUrl: string, language: Language): string {
  const url = new URL(baseUrl);
  url.searchParams.set("lang", language);
  return url.toString();
}
