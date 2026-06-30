import {
  PREVIEW_IFRAME_FALLBACK_HEIGHT,
  PREVIEW_IFRAME_MAX_HEIGHT,
  PREVIEW_IFRAME_MIN_HEIGHT,
} from "./types";

export const PREVIEW_HEIGHT_MESSAGE = "portfolio:content-height" as const;

export function clampPreviewHeight(height: number): number {
  return Math.min(
    PREVIEW_IFRAME_MAX_HEIGHT,
    Math.max(PREVIEW_IFRAME_MIN_HEIGHT, Math.ceil(height)),
  );
}

/** Read full document height when same-origin; null if cross-origin or unavailable. */
export function measureIframeDocumentHeight(
  iframe: HTMLIFrameElement | null,
): number | null {
  if (!iframe) return null;

  try {
    const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!doc?.body) return null;

    const root = doc.documentElement;
    const body = doc.body;

    return Math.max(
      root.scrollHeight,
      root.offsetHeight,
      body.scrollHeight,
      body.offsetHeight,
    );
  } catch {
    return null;
  }
}

/** Same-origin only — cross-origin sites must postMessage their height. */
export function resolvePreviewIframeHeight(measured: number | null): number | null {
  if (measured && measured > 0) {
    return clampPreviewHeight(measured + 48);
  }
  return null;
}

export function isPreviewHeightMessage(
  data: unknown,
): data is { type: typeof PREVIEW_HEIGHT_MESSAGE; height: number } {
  if (!data || typeof data !== "object") return false;
  const payload = data as { type?: unknown; height?: unknown };
  return (
    payload.type === PREVIEW_HEIGHT_MESSAGE &&
    typeof payload.height === "number" &&
    Number.isFinite(payload.height) &&
    payload.height > 0
  );
}

/** @deprecated cross-origin previews should rely on postMessage, not fallback inflation */
export { PREVIEW_IFRAME_FALLBACK_HEIGHT };
