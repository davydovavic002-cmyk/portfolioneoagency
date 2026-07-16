import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidCapsuleProps {
  label: string
  active?: boolean
  onHover?: (active: boolean) => void
  onClick?: () => void
}

export function LiquidCapsule({ label, active, onHover, onClick }: LiquidCapsuleProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      whileHover={{ scaleX: 0.88, scaleY: 1.14, rotate: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={cn(
        'brutal-border px-5 py-2.5 font-mono text-xs tracking-wider uppercase',
        active ? 'bg-page-accent text-page-bg' : 'bg-page-surface text-page-text hover:bg-page-accent-2/40',
      )}
    >
      {label}
    </motion.button>
  )
}
