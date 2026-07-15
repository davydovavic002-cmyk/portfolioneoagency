import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LiveMetric {
  label: string
  value: string
  status: 'ok' | 'warn' | 'live'
}

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

export function LiveStatsWidget() {
  const [metrics, setMetrics] = useState<LiveMetric[]>([
    { label: 'Latency', value: '—', status: 'live' },
    { label: 'Uptime', value: '99.97%', status: 'ok' },
    { label: 'Build', value: 'PASS', status: 'ok' },
  ])

  useEffect(() => {
    const measure = () => {
      const start = performance.now()
      requestAnimationFrame(() => {
        const frameMs = performance.now() - start
        const latency = Math.round(12 + frameMs + Math.random() * 18)
        setMetrics((prev) =>
          prev.map((m) =>
            m.label === 'Latency'
              ? { ...m, value: `${latency}ms`, status: latency < 40 ? 'ok' : 'warn' }
              : m,
          ),
        )
      })
    }

    measure()
    const id = window.setInterval(measure, 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.label !== 'Uptime') return m
          const base = 99.94 + Math.random() * 0.05
          return { ...m, value: `${base.toFixed(2)}%` }
        }),
      )
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
      whileHover={{ scale: 1.02 }}
      className="absolute top-20 right-4 z-20 border-2 border-page-text bg-page-surface/95 p-3 backdrop-blur-sm md:right-8 md:p-4"
    >
      <div className="mb-2 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-[#28c840]"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Live Node</span>
      </div>
      <div className="space-y-1.5">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-6 font-mono text-[10px]">
            <span className="text-page-muted uppercase">{m.label}</span>
            <motion.span
              key={m.value}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={SPRING}
              className={
                m.status === 'warn' ? 'text-page-accent' : m.status === 'live' ? 'text-page-text' : 'text-page-text'
              }
            >
              {m.value}
            </motion.span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
