import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const LOAD_TIMEOUT_MS = 10000

interface CasePreviewViewportProps {
  url: string
  title: string
}

export function CasePreviewViewport({ url, title }: CasePreviewViewportProps) {
  const [loading, setLoading] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const displayUrl = url.replace(/^https?:\/\//, '')

  useEffect(() => {
    setLoading(true)
    setBlocked(false)
    const timer = window.setTimeout(() => {
      setLoading((prev) => {
        if (prev) setBlocked(true)
        return false
      })
    }, LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [url])

  return (
    <div className="relative mx-auto w-full max-w-[1280px]">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80 blur-3xl md:-inset-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, color-mix(in srgb, var(--theme-accent-2) 35%, transparent), transparent 55%), radial-gradient(ellipse at 80% 70%, color-mix(in srgb, var(--theme-accent) 28%, transparent), transparent 50%), radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--theme-text) 8%, transparent), transparent 60%)',
        }}
      />

      <div className="relative overflow-hidden rounded-2xl bg-page-surface/90 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.18)] ring-1 ring-page-text/10 backdrop-blur-sm md:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-page-text/8 bg-page-bg/60 px-4 py-3 backdrop-blur-md md:px-5 md:py-3.5">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-page-text/15" />
            <span className="h-2 w-2 rounded-full bg-page-text/10" />
            <span className="h-2 w-2 rounded-full bg-page-text/10" />
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-page-surface/90 px-4 py-2 shadow-sm ring-1 ring-page-text/8">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-page-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
            </svg>
            <span className="truncate text-xs text-page-muted md:text-sm">{displayUrl}</span>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-page-text px-4 py-2 text-xs font-medium text-page-bg transition-opacity hover:opacity-85"
          >
            Open site
          </a>
        </div>

        <div
          className="relative h-[min(720px,78dvh)] w-full sm:h-[min(820px,80dvh)] md:h-[min(900px,82dvh)]"
          style={{
            background:
              'linear-gradient(145deg, color-mix(in srgb, var(--theme-bg) 70%, var(--theme-accent-2) 30%), color-mix(in srgb, var(--theme-bg) 80%, var(--theme-accent) 20%))',
          }}
        >
          {loading && !blocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="h-7 w-7 rounded-full border-2 border-page-text/15 border-t-page-accent"
              />
              <span className="text-xs text-page-muted">Loading preview…</span>
            </div>
          )}

          {blocked && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-page-bg/80 px-6 text-center backdrop-blur-sm">
              <p className="max-w-sm text-sm text-page-muted">
                Live preview couldn&apos;t load in the frame. Open the full site instead.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
              >
                Open {displayUrl}
              </a>
            </div>
          )}

          <div
            className="absolute inset-2 overflow-hidden rounded-xl bg-page-surface shadow-lg ring-1 ring-page-text/10 sm:inset-3 md:inset-4 md:rounded-2xl"
            data-lenis-prevent
          >
            <iframe
              ref={frameRef}
              src={url}
              title={`${title} live preview`}
              className="h-full w-full border-0 bg-page-surface"
              onLoad={() => {
                setLoading(false)
                setBlocked(false)
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-page-muted">
        Interactive preview — scroll inside the frame, or{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-page-text"
        >
          open full site
        </a>
      </p>
    </div>
  )
}
