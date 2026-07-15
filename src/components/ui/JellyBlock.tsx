import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface JellyBlockProps {
  label: string
  description: string
  price: number
  color: string
  active: boolean
  onToggle: () => void
}

export function JellyBlock({ label, description, price, color, active, onToggle }: JellyBlockProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      animate={{
        scale: active ? 1.06 : 1,
        backgroundColor: active ? color : 'var(--theme-surface)',
      }}
      whileHover={{ scale: active ? 1.08 : 1.02 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={cn(
        'brutal-border flex min-h-[200px] flex-col justify-between p-6 text-left',
        active ? 'text-page-bg' : 'text-page-text',
      )}
    >
      <div>
        <span className="font-mono text-[10px] tracking-widest uppercase">Module</span>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{label}</h3>
        <p className={cn('mt-2 text-sm', active ? 'text-page-bg/80' : 'text-page-muted')}>
          {description}
        </p>
      </div>
      <span className="font-mono text-sm font-bold">+{price.toLocaleString('en-US')}</span>
    </motion.button>
  )
}
