import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { formatPrice } from '@/lib/utils'

interface PriceMeterProps {
  value: number
}

export function PriceMeter({ value }: PriceMeterProps) {
  const spring = useSpring(value, { stiffness: 300, damping: 15 })
  const displayRef = useRef<HTMLSpanElement>(null)
  const formatted = useTransform(spring, (v) => formatPrice(Math.round(v)))

  useEffect(() => {
    const unsub = formatted.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = v
    })
    spring.set(value)
    return unsub
  }, [formatted, spring, value])

  return (
    <div className="receipt-tear brutal-border max-w-sm bg-page-surface p-6 polaroid-shadow">
      <div className="border-b-2 border-dashed border-page-text pb-3">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase">Estimate Receipt</p>
        <p className="mt-1 text-xs text-page-muted">NEO STUDIO SPACE — PRICING MODULE</p>
      </div>
      <motion.p
        className="mt-4 text-5xl font-bold tracking-tighter text-page-accent"
        key={value}
        initial={{ y: 20, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span ref={displayRef}>{formatPrice(value)}</span>
      </motion.p>
      <p className="mt-3 font-mono text-[9px] tracking-widest text-page-muted uppercase">
        * Final quote after discovery call
      </p>
    </div>
  )
}
