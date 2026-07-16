import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme'
import { modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

export function AestheticPromptBar() {
  const { theme, setTheme, parseCommand } = useTheme()
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = parseCommand(input)
    if (next) {
      setTheme(next)
      setFeedback(`Theme switched to ${next}`)
      setInput('')
      window.setTimeout(() => setFeedback(null), 2000)
    } else {
      setFeedback('Try: "go pink", "cyber mode", "make it grunge"')
      window.setTimeout(() => setFeedback(null), 2500)
    }
  }

  return (
    <div className={cn(modernPanel, 'p-4 md:p-5')}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className={cn(modernPill, 'bg-page-accent-2/15 text-page-text')}>
          Theme agent
        </span>
        <span className="text-xs text-page-muted">{theme.label}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type "make it grunge" or "cyber mode"...'
          className={cn(
            'min-w-0 flex-1 rounded-xl bg-page-bg px-4 py-3 text-sm outline-none ring-1 ring-page-text/10',
            'placeholder:text-page-muted focus:ring-2 focus:ring-page-accent/35',
          )}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="rounded-full bg-page-text px-5 py-3 text-sm font-medium text-page-bg"
        >
          Apply
        </motion.button>
      </form>
      <AnimatePresence>
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-page-muted"
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
