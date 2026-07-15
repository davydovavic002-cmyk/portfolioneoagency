import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const SHAPES = {
  circle: 'M50 10 C75 10, 90 30, 90 50 C90 75, 70 90, 50 90 C25 90, 10 70, 10 50 C10 25, 30 10, 50 10 Z',
  splash:
    'M50 5 L65 35 L95 40 L72 58 L78 88 L50 72 L22 88 L28 58 L5 40 L35 35 Z',
  star: 'M50 5 L58 32 L88 32 L63 48 L72 78 L50 60 L28 78 L37 48 L12 32 L42 32 Z',
}

interface MorphButtonProps {
  label: string
  selected: boolean
  onClick: () => void
}

export function MorphButton({ label, selected, onClick }: MorphButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={cn(
        'relative flex w-full items-center gap-4 overflow-hidden rounded-xl p-4 text-left ring-1 ring-page-text/10 transition-colors md:p-5',
        selected
          ? 'bg-page-accent text-page-bg ring-page-accent/30 shadow-sm'
          : 'bg-page-bg/80 hover:bg-page-surface hover:ring-page-text/15',
      )}
    >
      <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden className="shrink-0">
        <motion.path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="3"
          initial={false}
          animate={{ d: selected ? SHAPES.splash : SHAPES.circle }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
      </svg>
      <span className="text-base font-semibold md:text-lg">{label}</span>
    </motion.button>
  )
}
