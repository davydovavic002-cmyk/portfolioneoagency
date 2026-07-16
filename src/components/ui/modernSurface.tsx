import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export const modernPanel =
  'rounded-2xl bg-page-surface/90 shadow-[0_20px_60px_-16px_rgba(0,0,0,0.14)] ring-1 ring-page-text/10 backdrop-blur-sm md:rounded-3xl'

export const modernPill =
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'

export function ModernAmbient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute -inset-8 rounded-[2.5rem] opacity-70 blur-3xl md:-inset-16',
        className,
      )}
      aria-hidden
      style={{
        background:
          'radial-gradient(ellipse at 15% 20%, color-mix(in srgb, var(--theme-accent-2) 32%, transparent), transparent 55%), radial-gradient(ellipse at 85% 75%, color-mix(in srgb, var(--theme-accent) 26%, transparent), transparent 50%), radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--theme-text) 6%, transparent), transparent 60%)',
      }}
    />
  )
}

/** Long fade — avoids hard color line at section bottom */
export function sectionGradientStyle(): CSSProperties {
  return {
    background: [
      'linear-gradient(180deg,',
      'color-mix(in srgb, var(--theme-bg) 78%, var(--theme-accent-2) 22%) 0%,',
      'color-mix(in srgb, var(--theme-bg) 90%, var(--theme-accent-2) 10%) 35%,',
      'color-mix(in srgb, var(--theme-bg) 96%, var(--theme-accent-2) 4%) 65%,',
      'var(--theme-bg) 100%)',
    ].join(' '),
  }
}

export function sectionMeshStyle(): CSSProperties {
  return {
    background: [
      'linear-gradient(145deg,',
      'color-mix(in srgb, var(--theme-bg) 72%, var(--theme-accent-2) 28%) 0%,',
      'color-mix(in srgb, var(--theme-bg) 88%, var(--theme-accent) 12%) 50%,',
      'var(--theme-bg) 100%)',
    ].join(' '),
  }
}
