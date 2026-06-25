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
  const fitsNative = cw >= DESKTOP_VIEWPORT_WIDTH;
  const zoom = fitsNative ? 1 : cw / DESKTOP_VIEWPORT_WIDTH;

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden"
    >
      {ready && fitsNative && (
        <div className="h-full w-full">{children}</div>
      )}

      {ready && !fitsNative && useZoom && (
        <div
          className="w-full"
          style={{ height: Math.ceil(DESKTOP_VIEWPORT_HEIGHT * zoom) }}
        >
          <div
            style={{
              width: DESKTOP_VIEWPORT_WIDTH,
              height: DESKTOP_VIEWPORT_HEIGHT,
              zoom,
            }}
          >
            {children}
          </div>
        </div>
      )}

      {ready && !fitsNative && !useZoom && (
        <div className="h-full w-full overflow-auto" style={{ width: cw }}>
          <div style={{ width: cw, minHeight: ch }}>{children}</div>
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

export function DesktopSitePreview({
  previewUrl,
  title,
  language = "en",
  isMobile = false,
  children,
}: DesktopSitePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = previewUrl ? buildPreviewUrl(previewUrl, language) : undefined;

  useEffect(() => {
    postLanguageToIframe(iframeRef.current, language);
  }, [language, src]);

  if (previewUrl && isMobile) {
    return (
      <iframe
        ref={iframeRef}
        key={src}
        src={src}
        title={title}
        className="block h-full min-h-0 w-full flex-1 border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => postLanguageToIframe(iframeRef.current, language)}
      />
    );
  }

  if (previewUrl) {
    return (
      <DesktopPreviewViewport>
        <iframe
          ref={iframeRef}
          key={src}
          src={src}
          title={title}
          width={DESKTOP_VIEWPORT_WIDTH}
          height={DESKTOP_VIEWPORT_HEIGHT}
          className="block h-full w-full border-0 bg-white"
          style={{
            minWidth: DESKTOP_VIEWPORT_WIDTH,
            minHeight: DESKTOP_VIEWPORT_HEIGHT,
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => postLanguageToIframe(iframeRef.current, language)}
        />
      </DesktopPreviewViewport>
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
