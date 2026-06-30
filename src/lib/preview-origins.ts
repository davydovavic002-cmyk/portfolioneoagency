import { projects } from "./projects";

/** Origins of live case-study sites embedded in portfolio iframes. */
export const PREVIEW_ORIGINS = [
  ...new Set(
    projects
      .map((project) => project.previewUrl)
      .filter((url): url is string => Boolean(url))
      .map((url) => new URL(url).origin),
  ),
];

/** blessedangel.store serves both apex and www without redirect. */
export const BLESSED_ANGEL_EXTRA_ORIGINS = ["https://www.blessedangel.store"] as const;

export const PREVIEW_FRAME_ORIGINS = [
  ...new Set([...PREVIEW_ORIGINS, ...BLESSED_ANGEL_EXTRA_ORIGINS]),
];

export function isAllowedPreviewOrigin(origin: string): boolean {
  if (PREVIEW_ORIGINS.includes(origin)) return true;
  return BLESSED_ANGEL_EXTRA_ORIGINS.includes(
    origin as (typeof BLESSED_ANGEL_EXTRA_ORIGINS)[number],
  );
}

export function getPreviewOrigin(previewUrl: string): string {
  return new URL(previewUrl).origin;
}
