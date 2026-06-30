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

export function isAllowedPreviewOrigin(origin: string): boolean {
  return PREVIEW_ORIGINS.includes(origin);
}

export function getPreviewOrigin(previewUrl: string): string {
  return new URL(previewUrl).origin;
}
