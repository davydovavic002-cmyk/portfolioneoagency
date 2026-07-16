import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DraggableStickerProps {
  children: ReactNode
  className?: string
  initialX?: number
  initialY?: number
  rotation?: number
  zIndex?: number
}

export function DraggableSticker({
  children,
  className,
  initialX = 0,
  initialY = 0,
  rotation = 0,
  zIndex = 10,
}: DraggableStickerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={constraintsRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.18}
        dragMomentum
        dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
        whileHover={{ scale: 1.04, rotate: rotation + 2 }}
        whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
        initial={{ x: initialX, y: initialY, rotate: rotation }}
        className={cn('pointer-events-auto absolute cursor-grab', className)}
        style={{ zIndex }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function RetroTV() {
  return (
    <div className="brutal-border bg-[#ff4da6] p-3 polaroid-shadow">
      <div className="brutal-border flex h-20 w-28 items-center justify-center bg-page-text md:h-24 md:w-32">
        <div className="h-3 w-3 animate-pulse rounded-full bg-page-accent-2" />
      </div>
      <div className="mt-2 flex justify-between">
        <span className="font-mono text-[8px] uppercase">Neo TV</span>
        <span className="font-mono text-[8px]">CH.03</span>
      </div>
    </div>
  )
}

export function ArtBlob({ color = '#00c2ff' }: { color?: string }) {
  return (
    <svg width="100" height="90" viewBox="0 0 100 90" aria-hidden>
      <path
        d="M50 5 C75 5, 95 25, 90 50 C85 75, 60 88, 40 82 C15 75, 5 50, 20 25 C30 10, 40 5, 50 5 Z"
        fill={color}
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="38" cy="40" r="5" fill="currentColor" />
      <circle cx="62" cy="42" r="4" fill="currentColor" />
    </svg>
  )
}

export function StarBurst() {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden className="text-page-accent">
      <polygon
        points="35,2 43,27 70,27 48,42 56,68 35,52 14,68 22,42 0,27 27,27"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
