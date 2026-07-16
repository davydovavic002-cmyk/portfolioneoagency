import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, useTransform } from 'framer-motion'
import type { PricingLineItem } from '@/data/pricing'
import { formatLineItemPrice, formatPricingQuoteMessage } from '@/data/pricing'
import { telegramMessageUrl } from '@/data/site'
import { cn, formatPrice } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface ProjectTotalProps {
  value: number
  itemCount: number
  baseFee: number
  selectedItems: PricingLineItem[]
  compact?: boolean
}

export function ProjectTotal({
  value,
  itemCount,
  baseFee,
  selectedItems,
  compact = false,
}: ProjectTotalProps) {
  const spring = useSpring(value, { stiffness: 300, damping: 15 })
  const displayRef = useRef<HTMLSpanElement>(null)
  const formatted = useTransform(spring, (v) => formatPrice(Math.round(v)))
  const [copied, setCopied] = useState(false)

  const quoteText = formatPricingQuoteMessage(selectedItems, value)
  const telegramUrl = telegramMessageUrl(quoteText)

  useEffect(() => {
    const unsub = formatted.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = v
    })
    spring.set(value)
    return unsub
  }, [formatted, spring, value])

  const copyQuote = async () => {
    await navigator.clipboard.writeText(quoteText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-page-muted">
              {itemCount} package{itemCount === 1 ? '' : 's'} selected
            </p>
            <p className="text-2xl font-bold tracking-tight text-page-accent">
              <span ref={displayRef}>{formatPrice(value)}</span>
            </p>
          </div>
          <motion.a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="shrink-0 rounded-full bg-[#00c2ff] px-4 py-2.5 text-xs font-medium text-page-text"
          >
            Send to Telegram
          </motion.a>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => void copyQuote()}
            className="w-full text-center text-xs text-page-muted underline-offset-2 hover:text-page-text hover:underline"
          >
            {copied ? 'Copied to clipboard' : 'Copy quote text'}
          </button>
          {itemCount > 0 && (
            <Link
              to="/brief/project"
              state={{ selectedItems, total: value }}
              className="w-full text-center text-xs font-medium text-page-accent underline-offset-2 hover:underline"
            >
              Project brief — design & details →
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-page-surface/90 p-6 ring-1 ring-page-text/10 shadow-[0_20px_60px_-16px_rgba(0,0,0,0.14)]">
      <p className="text-sm font-semibold">Your estimate</p>
      <p className="mt-1 text-sm leading-relaxed text-page-muted">
        {itemCount > 0
          ? 'Send this selection to us — we\'ll confirm scope in Telegram'
          : 'Pick packages, then send the quote in one tap'}
      </p>

      {baseFee > 0 && (
        <div className="mt-5 flex justify-between border-t border-dashed border-page-text/20 pt-4 text-xs text-page-muted">
          <span>Base engagement</span>
          <span>{formatPrice(baseFee)}</span>
        </div>
      )}

      <div className={cn('flex justify-between text-xs text-page-muted', baseFee > 0 ? 'mt-3' : 'mt-5 border-t border-dashed border-page-text/20 pt-4')}>
        <span>Packages selected</span>
        <span>{itemCount}</span>
      </div>

      <motion.div
        className="mt-3"
        key={value}
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={SPRING}
      >
        <p className="text-4xl font-bold tracking-tight text-page-accent md:text-5xl">
          <span ref={displayRef}>{formatPrice(value)}</span>
        </p>
      </motion.div>

      {itemCount > 0 && (
        <ul className="mt-4 space-y-2 border-t border-page-text/10 pt-4">
          {selectedItems.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-xs leading-snug text-page-muted">
              <span className="min-w-0">{item.label}</span>
              <span className="shrink-0 tabular-nums text-page-text">{formatLineItemPrice(item)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-col gap-2">
        <motion.a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          className="flex items-center justify-center rounded-full bg-[#00c2ff] px-5 py-3 text-sm font-medium text-page-text transition-opacity hover:opacity-90"
        >
          {itemCount > 0 ? 'Send quote to Telegram' : 'Message us on Telegram'}
        </motion.a>

        {itemCount > 0 ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <motion.button
              type="button"
              onClick={() => void copyQuote()}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="rounded-full bg-page-bg px-4 py-2.5 text-sm ring-1 ring-page-text/10 transition-opacity hover:opacity-80"
            >
              {copied ? 'Copied' : 'Copy quote'}
            </motion.button>
            <Link
              to="/brief/project"
              state={{ selectedItems, total: value }}
              className="flex items-center justify-center rounded-full bg-page-text px-4 py-2.5 text-sm font-medium text-page-bg transition-opacity hover:opacity-90"
            >
              Project brief — design & details
            </Link>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={() => void copyQuote()}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="rounded-full bg-page-bg px-4 py-2.5 text-sm ring-1 ring-page-text/10 transition-opacity hover:opacity-80"
          >
            {copied ? 'Copied' : 'Copy quote'}
          </motion.button>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-page-muted">
        {itemCount === 0
          ? 'No checkout here — we confirm everything in chat before any invoice.'
          : '“From” packages show the floor in the total. Fill the project brief for design direction and content.'}
      </p>
    </div>
  )
}
