import { clampPreviewHeight } from "./iframe-preview-height";

export const PREVIEW_ROUTE_CHANGE_MESSAGE = "portfolio:route-change" as const;

export function normalizePreviewSubpagePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function isPreviewRouteChangeMessage(
  data: unknown,
): data is { type: typeof PREVIEW_ROUTE_CHANGE_MESSAGE; path: string } {
  if (!data || typeof data !== "object") return false;
  const payload = data as { type?: unknown; path?: unknown };
  return (
    payload.type === PREVIEW_ROUTE_CHANGE_MESSAGE &&
    typeof payload.path === "string" &&
    payload.path.length > 0
  );
}

export function getPreviewHeightPath(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const path = (data as { path?: unknown }).path;
  if (typeof path !== "string" || !path.length) return undefined;
  return normalizePreviewSubpagePath(path);
}

export function resolveSubpageHeight(
  height: number,
  maxHeight: number | undefined,
): number {
  const clamped = clampPreviewHeight(height);
  return maxHeight !== undefined ? Math.min(clamped, maxHeight) : clamped;
}
