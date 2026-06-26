"use client";

import { useEffect, useRef, useState } from "react";
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
  PREVIEW_IFRAME_HEIGHT,
  type Language,
} from "@/lib/types";
import { buildPreviewUrl, PORTFOLIO_LANG_MESSAGE } from "@/lib/preview-url";

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

      host.scrollTop += e.deltaY;
      e.preventDefault();
    };

    host.addEventListener("wheel", onWheel, { passive: false });
    return () => host.removeEventListener("wheel", onWheel);
  }, [scrollable]);

  const { width: cw } = layout;
  const ready = cw > 0;
  const zoomW = cw / DESKTOP_VIEWPORT_WIDTH;
  const zoom = zoomW;

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
        height: Math.ceil(contentHeight * zoom),
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
    <div ref={measureRef} className="w-full">
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
  title: string;
  language?: Language;
  isMobile?: boolean;
  children?: React.ReactNode;
}

function postLanguageToIframe(iframe: HTMLIFrameElement | null, language: Language) {
  iframe?.contentWindow?.postMessage(
    { type: PORTFOLIO_LANG_MESSAGE, language },
    "*",
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
  title,
  language = "en",
  isMobile = false,
  children,
}: DesktopSitePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = previewUrl ? buildPreviewUrl(previewUrl, language) : undefined;
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    previewUrl ? "loading" : "ready",
  );

  useEffect(() => {
    if (previewUrl) setLoadState("loading");
  }, [previewUrl, src]);

  useEffect(() => {
    postLanguageToIframe(iframeRef.current, language);
  }, [language, src]);

  const iframeProps = {
    ref: iframeRef,
    key: src,
    src,
    title,
    scrolling: "no" as const,
    sandbox: "allow-scripts allow-same-origin allow-forms allow-popups" as const,
    onLoad: () => {
      setLoadState("ready");
      postLanguageToIframe(iframeRef.current, language);
    },
    onError: () => setLoadState("error"),
  };

  if (previewUrl && isMobile) {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col">
        {loadState === "loading" && (
          <div className="absolute inset-0 z-10">
            <PreviewStatus language={language} state="loading" />
          </div>
        )}
        {loadState === "error" && (
          <PreviewStatus language={language} state="error" openUrl={src} />
        )}
        <div
          className={`preview-iframe-scroll min-h-0 flex-1 ${
            loadState === "error" ? "hidden" : ""
          }`}
        >
          <iframe
            {...iframeProps}
            className="portfolio-preview-iframe block w-full border-0 bg-white"
            style={{ height: PREVIEW_IFRAME_HEIGHT }}
          />
        </div>
      </div>
    );
  }

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
          <DesktopPreviewViewport
            contentHeight={PREVIEW_IFRAME_HEIGHT}
            scrollable
          >
            <iframe
              {...iframeProps}
              width={DESKTOP_VIEWPORT_WIDTH}
              height={PREVIEW_IFRAME_HEIGHT}
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
