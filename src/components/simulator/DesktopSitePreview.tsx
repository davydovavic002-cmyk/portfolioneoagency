"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
  PREVIEW_IFRAME_DEFAULT_HEIGHT,
  type Language,
} from "@/lib/types";
import {
  getPreviewOrigin,
  isAllowedPreviewOrigin,
} from "@/lib/preview-origins";
import { buildPreviewUrl, PORTFOLIO_LANG_MESSAGE } from "@/lib/preview-url";
import {
  clampPreviewHeight,
  isPreviewHeightMessage,
  measureIframeDocumentHeight,
  resolvePreviewIframeHeight,
} from "@/lib/iframe-preview-height";
import {
  getPreviewHeightPath,
  isPreviewRouteChangeMessage,
  normalizePreviewSubpagePath,
} from "@/lib/pilates-preview-height";

interface Layout {
  width: number;
}

const PREVIEW_COPY: Record<
  Language,
  { loading: string; error: string; retry: string }
> = {
  en: {
    loading: "Loading preview…",
    error: "Preview could not load.",
    retry: "Open site",
  },
  ru: {
    loading: "Загрузка превью…",
    error: "Не удалось загрузить превью.",
    retry: "Открыть сайт",
  },
  am: {
    loading: "Նախադիտումը բեռնվում է…",
    error: "Չհաջողվեց բեռնել նախադիտումը։",
    retry: "Բացել կայքը",
  },
};

const HEIGHT_REMEASURE_DELAYS_MS = [400, 1200, 2800, 5500];

function supportsZoom(): boolean {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("zoom", "1");
}

interface DesktopPreviewViewportProps {
  children: React.ReactNode;
  contentHeight?: number;
  scrollable?: boolean;
}

/**
 * Fixed desktop width (1280px), width-first zoom.
 * When scrollable, the parent panel scrolls with a custom scrollbar.
 */
export function DesktopPreviewViewport({
  children,
  contentHeight = DESKTOP_VIEWPORT_HEIGHT,
  scrollable = false,
}: DesktopPreviewViewportProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ width: 0 });
  const useZoom = supportsZoom();

  useEffect(() => {
    const target = measureRef.current;
    if (!target) return;

    const measure = () => {
      setLayout({ width: Math.floor(target.getBoundingClientRect().width) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!scrollable) return;
    const host = scrollRef.current;
    if (!host) return;

    const onWheel = (e: WheelEvent) => {
      const iframe = host.querySelector("iframe");
      if (!iframe) return;

      const rect = iframe.getBoundingClientRect();
      const overIframe =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!overIframe) return;

      const maxScroll = host.scrollHeight - host.clientHeight;
      const nextScrollTop = host.scrollTop + e.deltaY;
      const canScrollDown = host.scrollTop < maxScroll - 1;
      const canScrollUp = host.scrollTop > 0;

      if ((e.deltaY > 0 && !canScrollDown) || (e.deltaY < 0 && !canScrollUp)) {
        return;
      }

      host.scrollTop = Math.max(0, Math.min(maxScroll, nextScrollTop));
      e.preventDefault();
    };

    host.addEventListener("wheel", onWheel, { passive: false });
    return () => host.removeEventListener("wheel", onWheel);
  }, [scrollable, contentHeight]);

  const { width: cw } = layout;
  const ready = cw > 0;
  const zoom = cw / DESKTOP_VIEWPORT_WIDTH;
  const scaledHeight = Math.ceil(contentHeight * zoom);

  const scaledContent = ready && useZoom && (
    <div
      style={{
        width: DESKTOP_VIEWPORT_WIDTH,
        height: contentHeight,
        zoom,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );

  const scaledContentFallback = ready && !useZoom && (
    <div
      style={{
        width: Math.ceil(DESKTOP_VIEWPORT_WIDTH * zoom),
        height: scaledHeight,
      }}
    >
      <div
        style={{
          width: DESKTOP_VIEWPORT_WIDTH,
          height: contentHeight,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );

  const inner = (
    <div
      ref={measureRef}
      className="w-full"
      style={ready && scrollable ? { height: scaledHeight } : undefined}
    >
      {scaledContent}
      {scaledContentFallback}
    </div>
  );

  if (scrollable) {
    return (
      <div ref={scrollRef} className="preview-iframe-scroll h-full w-full min-h-0">
        {inner}
      </div>
    );
  }

  return (
    <div ref={measureRef} className="h-full w-full overflow-hidden">
      {scaledContent}
      {scaledContentFallback}
    </div>
  );
}

interface DesktopSitePreviewProps {
  previewUrl?: string;
  previewInitialHeight?: number;
  previewMaxHeight?: number;
  previewExactPostMessage?: boolean;
  previewPostMessagePadding?: number;
  previewSubpageMaxHeights?: Record<string, number>;
  title: string;
  language?: Language;
  children?: React.ReactNode;
}

function resolvePreviewHeight(height: number, maxHeight?: number): number {
  const clamped = clampPreviewHeight(height);
  return maxHeight !== undefined ? Math.min(clamped, maxHeight) : clamped;
}

function resolvePreviewInitialHeight(
  previewInitialHeight?: number,
  previewMaxHeight?: number,
): number {
  if (previewInitialHeight !== undefined) {
    return previewMaxHeight !== undefined
      ? Math.min(previewInitialHeight, previewMaxHeight)
      : previewInitialHeight;
  }
  if (previewMaxHeight !== undefined) {
    return Math.min(PREVIEW_IFRAME_DEFAULT_HEIGHT, previewMaxHeight);
  }
  return PREVIEW_IFRAME_DEFAULT_HEIGHT;
}

function postLanguageToIframe(
  iframe: HTMLIFrameElement | null,
  language: Language,
  targetOrigin: string,
) {
  iframe?.contentWindow?.postMessage(
    { type: PORTFOLIO_LANG_MESSAGE, language },
    targetOrigin,
  );
}

function PreviewStatus({
  language,
  state,
  openUrl,
}: {
  language: Language;
  state: "loading" | "error";
  openUrl?: string;
}) {
  const copy = PREVIEW_COPY[language];
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 bg-[#0a0a0a] px-6 text-center">
      <p className="text-[13px] text-zinc-500">
        {state === "loading" ? copy.loading : copy.error}
      </p>
      {state === "error" && openUrl && (
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/[0.12] px-4 py-2 text-[12px] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
        >
          {copy.retry}
        </a>
      )}
    </div>
  );
}

export function DesktopSitePreview({
  previewUrl,
  previewInitialHeight,
  previewMaxHeight,
  previewExactPostMessage = false,
  previewPostMessagePadding,
  previewSubpageMaxHeights,
  title,
  language = "en",
  children,
}: DesktopSitePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onScheduleViewRef = useRef(false);
  const iframeReadyAtRef = useRef(0);
  const heightBurstRef = useRef<{ height: number; ts: number }[]>([]);
  const scheduleCap = previewSubpageMaxHeights?.["/schedule"];
  const src = previewUrl
    ? buildPreviewUrl(
        previewUrl,
        language,
        scheduleCap !== undefined
          ? { scheduleMaxHeight: scheduleCap }
          : undefined,
      )
    : undefined;
  const previewOrigin = previewUrl ? getPreviewOrigin(previewUrl) : undefined;
  const startingHeight = resolvePreviewInitialHeight(
    previewInitialHeight,
    previewMaxHeight,
  );
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    previewUrl ? "loading" : "ready",
  );
  const [iframeHeight, setIframeHeight] = useState(startingHeight);

  const syncIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const measured = measureIframeDocumentHeight(iframe);
    if (measured === null) return;

    setIframeHeight((current) => {
      const next = resolvePreviewHeight(
        resolvePreviewIframeHeight(measured),
        previewMaxHeight,
      );
      return Math.max(current, next);
    });
  }, [previewMaxHeight]);

  useEffect(() => {
    if (previewUrl) {
      setLoadState("loading");
      setIframeHeight(startingHeight);
      onScheduleViewRef.current = false;
      heightBurstRef.current = [];
      iframeReadyAtRef.current = 0;
    }
  }, [previewUrl, src, startingHeight]);

  useEffect(() => {
    if (!previewOrigin) return;
    postLanguageToIframe(iframeRef.current, language, previewOrigin);
  }, [language, previewOrigin, src]);

  useEffect(() => {
    const padding = previewPostMessagePadding ?? 48;
    const subpageCaps = previewSubpageMaxHeights;
    const scheduleMax = subpageCaps?.["/schedule"];

    const applyScheduleCap = (height: number) => {
      if (scheduleMax === undefined) return height;
      onScheduleViewRef.current = true;
      return Math.min(height, scheduleMax);
    };

    const trackHeightBurst = (height: number): boolean => {
      if (scheduleMax === undefined) return false;

      const now = Date.now();
      const readyAt = iframeReadyAtRef.current;
      if (readyAt === 0 || now - readyAt < 4_000) return false;

      heightBurstRef.current.push({ height, ts: now });
      heightBurstRef.current = heightBurstRef.current.filter(
        (entry) => now - entry.ts < 2_500,
      );

      if (heightBurstRef.current.length < 4) return false;

      const heights = heightBurstRef.current.map((entry) => entry.height);
      const min = Math.min(...heights);
      const max = Math.max(...heights);

      return max - min <= 64 && max > scheduleMax * 1.35;
    };

    const onMessage = (event: MessageEvent) => {
      if (!isAllowedPreviewOrigin(event.origin)) return;

      if (subpageCaps) {
        if (isPreviewRouteChangeMessage(event.data)) {
          const path = normalizePreviewSubpagePath(event.data.path);

          if (path === "/schedule" && scheduleMax !== undefined) {
            onScheduleViewRef.current = true;
            setIframeHeight(scheduleMax);
            return;
          }

          if (path === "/" || path === "") {
            onScheduleViewRef.current = false;
          }

          const cap = subpageCaps[path];
          if (cap !== undefined) {
            setIframeHeight(cap);
          }
          return;
        }

        if (!isPreviewHeightMessage(event.data)) return;

        const path = getPreviewHeightPath(event.data);
        const next = resolvePreviewHeight(
          event.data.height + padding,
          previewMaxHeight,
        );

        if (path === "/schedule") {
          onScheduleViewRef.current = true;
          setIframeHeight(applyScheduleCap(next));
          return;
        }

        if (path === "/" || path === "") {
          onScheduleViewRef.current = false;
        }

        if (onScheduleViewRef.current && scheduleMax !== undefined) {
          setIframeHeight(Math.min(next, scheduleMax));
          return;
        }

        if (trackHeightBurst(next)) {
          setIframeHeight(applyScheduleCap(next));
          return;
        }

        setIframeHeight((current) => {
          if (
            scheduleMax !== undefined &&
            next < current * 0.72 &&
            next <= scheduleMax + 400
          ) {
            onScheduleViewRef.current = true;
            return Math.min(next, scheduleMax);
          }

          if (
            scheduleMax !== undefined &&
            next <= scheduleMax + 120 &&
            next >= scheduleMax - 800
          ) {
            onScheduleViewRef.current = true;
            return Math.min(next, scheduleMax);
          }

          return next < current ? next : Math.max(current, next);
        });
        return;
      }

      if (!isPreviewHeightMessage(event.data)) return;

      const next = resolvePreviewHeight(event.data.height + padding, previewMaxHeight);

      if (previewExactPostMessage) {
        setIframeHeight((current) =>
          next < current ? next : Math.max(current, next),
        );
        return;
      }

      setIframeHeight((current) => Math.max(current, next));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [
    previewExactPostMessage,
    previewMaxHeight,
    previewPostMessagePadding,
    previewSubpageMaxHeights,
  ]);

  useEffect(() => {
    if (loadState !== "ready") return;

    syncIframeHeight();
    const timers = HEIGHT_REMEASURE_DELAYS_MS.map((delay) =>
      window.setTimeout(syncIframeHeight, delay),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [loadState, src, syncIframeHeight]);

  const handleIframeLoad = () => {
    setLoadState("ready");
    iframeReadyAtRef.current = Date.now();
    if (previewOrigin) {
      postLanguageToIframe(iframeRef.current, language, previewOrigin);
    }
    syncIframeHeight();
  };

  const iframeProps = {
    ref: iframeRef,
    key: src,
    src,
    title,
    scrolling: "no" as const,
    sandbox: "allow-scripts allow-same-origin allow-forms" as const,
    onLoad: handleIframeLoad,
    onError: () => setLoadState("error"),
  };

  if (previewUrl) {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col">
        {loadState === "loading" && (
          <div className="absolute inset-0 z-10">
            <PreviewStatus language={language} state="loading" />
          </div>
        )}
        {loadState === "error" ? (
          <PreviewStatus language={language} state="error" openUrl={src} />
        ) : (
          <DesktopPreviewViewport contentHeight={iframeHeight} scrollable>
            <iframe
              {...iframeProps}
              width={DESKTOP_VIEWPORT_WIDTH}
              height={iframeHeight}
              className="portfolio-preview-iframe block w-full border-0 bg-white"
            />
          </DesktopPreviewViewport>
        )}
      </div>
    );
  }

  return (
    <DesktopPreviewViewport>
      <div
        className="h-full w-full overflow-hidden bg-black"
        style={{
          width: DESKTOP_VIEWPORT_WIDTH,
          height: DESKTOP_VIEWPORT_HEIGHT,
        }}
      >
        {children}
      </div>
    </DesktopPreviewViewport>
  );
}
