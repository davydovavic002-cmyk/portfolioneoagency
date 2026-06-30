export const MOBILE_MEDIA_QUERY = "(max-width: 1023px)";

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function opensMobileContentForView(mode: string): boolean {
  return mode === "brief" || mode === "services" || mode === "about";
}
