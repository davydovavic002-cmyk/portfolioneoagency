"use client";

import { useEffect, useRef, useState } from "react";
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
  type Language,
} from "@/lib/types";
import { buildPreviewUrl, PORTFOLIO_LANG_MESSAGE } from "@/lib/preview-url";

interface Layout {
  width: number;
  height: number;
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
}

/**
 * Renders children at a fixed desktop viewport (1280×800) and fits them
 * into the available panel width using zoom — sharp, width-first.
 */
export function DesktopPreviewViewport({ children }: DesktopPreviewViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ width: 0, height: 0 });
  const useZoom = supportsZoom();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const { width, height } = container.getBoundingClientRect();
      setLayout({
        width: Math.floor(width),
        height: Math.floor(height),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { width: cw, height: ch } = layout;
  const ready = cw > 0 && ch > 0;
  const zoomW = cw / DESKTOP_VIEWPORT_WIDTH;
  /** Width-first: fill the panel edge-to-edge, clip vertical overflow */
  const zoom = zoomW;

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden"
    >
      {ready && useZoom && (
        <div className="h-full w-full overflow-hidden">
          <div
            style={{
              width: DESKTOP_VIEWPORT_WIDTH,
              height: DESKTOP_VIEWPORT_HEIGHT,
              zoom,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
        </div>
      )}

      {ready && !useZoom && (
        <div className="h-full w-full overflow-hidden">
          <div
            style={{
              width: Math.ceil(DESKTOP_VIEWPORT_WIDTH * zoom),
              height: Math.ceil(DESKTOP_VIEWPORT_HEIGHT * zoom),
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: DESKTOP_VIEWPORT_WIDTH,
                height: DESKTOP_VIEWPORT_HEIGHT,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
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
        <iframe
          {...iframeProps}
          className={`block h-full min-h-0 w-full flex-1 border-0 bg-white overflow-hidden ${
            loadState === "error" ? "hidden" : ""
          }`}
        />
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
          <DesktopPreviewViewport>
            <iframe
              {...iframeProps}
              width={DESKTOP_VIEWPORT_WIDTH}
              height={DESKTOP_VIEWPORT_HEIGHT}
              className="portfolio-preview-iframe block h-full w-full border-0 bg-white"
              style={{
                minWidth: DESKTOP_VIEWPORT_WIDTH,
                minHeight: DESKTOP_VIEWPORT_HEIGHT,
              }}
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
