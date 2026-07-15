import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RubberTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p'
}

export function RubberText({ text, className, as: Tag = 'h1' }: RubberTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chars, setChars] = useState<{ char: string; scaleX: number; scaleY: number; rotate: number }[]>(
    () => text.split('').map((char) => ({ char, scaleX: 1, scaleY: 1, rotate: 0 })),
  )

  useEffect(() => {
    setChars(text.split('').map((char) => ({ char, scaleX: 1, scaleY: 1, rotate: 0 })))
  }, [text])

  useEffect(() => {
    let frame = 0

    const onMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const localX = event.clientX - rect.left
      const localY = event.clientY - rect.top

      setChars((prev) =>
        prev.map((item, index) => {
          const charWidth = rect.width / Math.max(prev.length, 1)
          const cx = index * charWidth + charWidth / 2
          const cy = rect.height / 2
          const dx = localX - cx
          const dy = localY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - dist / 280)
          const squash = 1 + influence * 0.45
          const stretch = 1 - influence * 0.2

          return {
            ...item,
            scaleX: squash,
            scaleY: stretch,
            rotate: (dx / rect.width) * influence * 12,
          }
        }),
      )
    }

    const onLeave = () => {
      setChars((prev) => prev.map((item) => ({ ...item, scaleX: 1, scaleY: 1, rotate: 0 })))
    }

    const throttledMove = (event: MouseEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        onMove(event)
        frame = 0
      })
    }

    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('select-none', className)}>
      <Tag className="text-grotesk-huge text-[clamp(3rem,13vw,10rem)] text-page-text">
        {chars.map((item, index) => (
          <span
            key={`${item.char}-${index}`}
            className="inline-block origin-center transition-transform duration-100 will-change-transform"
            style={{
              transform: `scaleX(${item.scaleX}) scaleY(${item.scaleY}) rotate(${item.rotate}deg)`,
            }}
          >
            {item.char === ' ' ? '\u00A0' : item.char}
          </span>
        ))}
      </Tag>
    </div>
  )
}

interface StickerBadgeProps {
  children: ReactNode
  className?: string
  color?: string
}

export function StickerBadge({ children, className, color = 'var(--theme-accent-2)' }: StickerBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rotate-[-3deg] border-2 border-page-text px-3 py-1 font-mono text-[10px] tracking-widest uppercase',
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  )
}
