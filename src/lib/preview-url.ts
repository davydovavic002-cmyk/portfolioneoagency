import type { Language } from "./types";

export const PORTFOLIO_LANG_MESSAGE = "portfolio:set-language" as const;

export interface PreviewUrlOptions {
  scheduleMaxHeight?: number;
}

export function buildPreviewUrl(
  baseUrl: string,
  language: Language,
  options?: PreviewUrlOptions,
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("lang", language);
  url.searchParams.set("embed", "portfolio");
  if (options?.scheduleMaxHeight !== undefined) {
    url.searchParams.set(
      "portfolio_schedule_cap",
      String(options.scheduleMaxHeight),
    );
  }
  return url.toString();
}
