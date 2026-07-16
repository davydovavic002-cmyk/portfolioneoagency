import { useState, useCallback, type FormEvent, type KeyboardEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { generateScopeFromIdea, formatScopeReport, type ScopeBreakdown } from '@/lib/aiScopeGenerator'
import { telegramMessageUrl } from '@/data/site'
import { ModernAmbient, modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

type AgentPhase = 'idle' | 'loading' | 'result'

function ScopeOutput({ result, prompt }: { result: ScopeBreakdown; prompt: string }) {
  const sections = [
    { label: 'Stack', items: result.stack },
    { label: 'Deployment', items: result.deployment },
    { label: 'Pipeline', items: result.pipeline },
    { label: 'Phases', items: result.phases.map((p) => `${p.name} — ${p.days}d`) },
  ]

  const reportText = formatScopeReport(prompt, result)
  const [copied, setCopied] = useState(false)

  const copyReport = async () => {
    await navigator.clipboard.writeText(reportText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={SPRING}
      className="space-y-4 text-sm leading-relaxed"
    >
      {sections.map((section, i) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING, delay: i * 0.06 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-page-accent">{section.label}</p>
          <ul className="mt-1.5 space-y-1 text-page-muted">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-page-accent">·</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      <p className="border-t border-page-text/10 pt-3 font-semibold text-page-text">
        Estimated time: {result.estimatedDays} days
      </p>

      <div className="space-y-3 border-t border-page-text/10 pt-4">
        <p className="text-sm text-page-muted">
          Draft estimate — we&apos;ll refine it in writing after your brief.
        </p>
        <div className="flex flex-wrap gap-2">
          <motion.a
            href={telegramMessageUrl(`Hi NEO STUDIO — scope draft:\n\n${reportText}`)}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="rounded-full bg-[#00c2ff] px-4 py-2 text-xs font-medium text-page-text"
          >
            Send to Telegram
          </motion.a>
          <motion.button
            type="button"
            onClick={() => void copyReport()}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="rounded-full bg-page-bg px-4 py-2 text-xs font-medium ring-1 ring-page-text/10"
          >
            {copied ? 'Copied' : 'Copy scope'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function LoadingState() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={SPRING}
      className="flex items-center gap-3 text-sm text-page-muted"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="h-5 w-5 rounded-full border-2 border-page-text/15 border-t-page-accent"
      />
      Wiring stack and timeline…
    </motion.div>
  )
}

function ExecutionManifesto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={SPRING}
      className={cn(modernPanel, 'relative overflow-hidden p-8 md:p-10 lg:min-h-full')}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent-2) 14%, transparent), transparent 55%, color-mix(in srgb, var(--theme-accent) 10%, transparent))',
        }}
      />
      <div className="relative flex h-full flex-col justify-center">
        <span className={cn(modernPill, 'bg-page-accent-2/15 text-page-text')}>How we start</span>

        <h2 className="mt-6 text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl">
          Every project begins with working software — not slide decks.
        </h2>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-page-muted md:text-lg">
          Start with a short brief on the site. We map the build in writing — no templates, no
          off-the-shelf skins. You get a staging URL early so you can click through the real UI (or
          bot draft) while we iterate.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {['Brief on site', 'Custom design', 'Staging early'].map((chip) => (
            <span
              key={chip}
              className={cn(modernPill, 'bg-page-bg/80 text-page-muted ring-1 ring-page-text/8')}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function AiSandbox() {
  const [prompt, setPrompt] = useState('')
  const [phase, setPhase] = useState<AgentPhase>('idle')
  const [result, setResult] = useState<ScopeBreakdown | null>(null)

  const runAgent = useCallback(async () => {
    const trimmed = prompt.trim()
    if (!trimmed || phase === 'loading') return

    setPhase('loading')
    setResult(null)
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setResult(generateScopeFromIdea(trimmed))
    setPhase('result')
  }, [prompt, phase])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void runAgent()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      void runAgent()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING, delay: 0.08 }}
      className={cn(modernPanel, 'overflow-hidden')}
    >
      {/* Modern terminal chrome */}
      <div className="flex items-center gap-3 border-b border-page-text/10 bg-page-bg/50 px-4 py-3 backdrop-blur-md md:px-5">
        <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-page-text/15" />
          <span className="h-2 w-2 rounded-full bg-page-text/10" />
          <span className="h-2 w-2 rounded-full bg-page-text/10" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-page-surface/90 px-4 py-2 ring-1 ring-page-text/8">
          <span className="text-xs text-page-accent">◇</span>
          <span className="truncate text-xs text-page-muted">Instant AI Scope Generator · v1.0</span>
        </div>
      </div>

      <div
        className="p-5 md:p-6"
        style={{
          background:
            'linear-gradient(145deg, color-mix(in srgb, var(--theme-bg) 75%, var(--theme-accent-2) 25%), var(--theme-bg))',
        }}
      >
        <p className="text-sm leading-relaxed text-page-muted">
          Type your project idea in one sentence. Our local agent drafts the stack and timeline
          instantly — no API calls, just a smart starting point for our call.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label className="sr-only" htmlFor="ai-scope-prompt">
            Project idea
          </label>
          <div className="flex items-center gap-2 rounded-xl bg-page-surface/95 px-4 py-3 ring-1 ring-page-text/10">
            <span className="text-sm text-page-accent">&gt;</span>
            <input
              id="ai-scope-prompt"
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
                if (phase === 'result') {
                  setPhase('idle')
                  setResult(null)
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Telegram bot with vector search and a dashboard…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-page-muted/60"
              disabled={phase === 'loading'}
            />
            <span className="terminal-cursor h-4 w-2 shrink-0 rounded-sm bg-[#00c2ff]" aria-hidden />
          </div>

          <motion.button
            type="submit"
            disabled={!prompt.trim() || phase === 'loading'}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="mt-3 rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg disabled:cursor-not-allowed disabled:opacity-40"
          >
            Run agent
          </motion.button>
        </form>

        <LayoutGroup>
          <motion.div
            layout
            transition={SPRING}
            className="mt-5 min-h-[100px] rounded-xl bg-page-surface/80 p-4 ring-1 ring-page-text/8 md:p-5"
          >
            <AnimatePresence mode="wait">
              {phase === 'loading' && <LoadingState key="loading" />}
              {phase === 'result' && result && (
                <ScopeOutput key="result" result={result} prompt={prompt.trim()} />
              )}
              {phase === 'idle' && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={SPRING}
                  className="text-sm text-page-muted"
                >
                  Awaiting your idea…
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </motion.div>
  )
}

export function ConversionZone() {
  return (
    <section
      className="relative px-4 py-16 md:px-10 md:py-20"
      style={{
        background: [
          'linear-gradient(180deg,',
          'var(--theme-bg) 0%,',
          'color-mix(in srgb, var(--theme-bg) 92%, var(--theme-accent-2) 8%) 40%,',
          'color-mix(in srgb, var(--theme-bg) 88%, var(--theme-accent) 12%) 100%)',
        ].join(' '),
      }}
    >
      <ModernAmbient className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="relative mx-auto max-w-[1120px]">
        <div className="mb-8 text-center md:mb-10">
          <span className={cn(modernPill, 'bg-page-surface/90 text-page-muted ring-1 ring-page-text/10')}>
            Start here
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            From brief to working preview
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <ExecutionManifesto />
          <AiSandbox />
        </div>
      </div>
    </section>
  )
}
