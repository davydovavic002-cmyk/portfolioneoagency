import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { ModernAmbient, modernPanel, modernPill, sectionGradientStyle } from '@/components/ui/modernSurface'
import { formatBriefMessage, submitBrief, type BriefSubmitResult } from '@/lib/briefApi'
import { telegramMessageUrl } from '@/data/site'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface BriefOption {
  label: string
  hint?: string
}

interface Step {
  id: string
  question: string
  help: string
  type: 'choice' | 'text'
  options?: BriefOption[]
  placeholder?: string
}

/** Aligned with current pricing ladder */
const steps: Step[] = [
  {
    id: 'type',
    question: 'What do you need?',
    help: 'No wrong answer — we’ll suggest a package either way.',
    type: 'choice',
    options: [
      { label: 'Landing page', hint: 'One page · from $400' },
      { label: 'Small site (up to 3 pages)', hint: 'from $500' },
      { label: 'Brand site or store', hint: 'from $1,000 / $2,000' },
      { label: 'Bot or AI agent', hint: 'from $400 · same band as sites' },
      { label: 'Site + bot together', hint: 'We’ll combine packages' },
      { label: 'Not sure yet', hint: 'Tell us the goal — we’ll guide' },
    ],
  },
  {
    id: 'budget',
    question: 'What budget feels comfortable?',
    help: 'Packages start at $400. “From” prices are floors — we confirm after the brief.',
    type: 'choice',
    options: [
      { label: '$400 – $1,000', hint: 'Landing · small site · starter bot' },
      { label: '$1,000 – $2,500', hint: 'Brand site · store · AI bot' },
      { label: '$2,500 – $5,000', hint: 'Store + extras · web app start' },
      { label: '$5,000+', hint: 'Bigger product / multi-piece build' },
    ],
  },
  {
    id: 'timeline',
    question: 'When would you like to launch?',
    help: 'Landings often ship in 1–2 weeks when scope is clear.',
    type: 'choice',
    options: [
      { label: '1–2 weeks', hint: 'Best for a clear landing' },
      { label: '2–4 weeks', hint: 'Multi-page, store, or ops bot' },
      { label: '1–2 months', hint: 'Web app or heavier AI' },
      { label: 'Flexible', hint: 'No hard deadline' },
    ],
  },
  {
    id: 'contact',
    question: 'Where can we reply?',
    help: 'Email or Telegram — whichever you check most.',
    type: 'text',
    placeholder: 'you@email.com or @telegram',
  },
]

export function BriefPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [textValue, setTextValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitResult, setSubmitResult] = useState<BriefSubmitResult | null>(null)

  const step = steps[stepIndex]
  const progress = ((stepIndex + (submitted ? 1 : 0)) / steps.length) * 100
  const briefMessage = formatBriefMessage(answers)
  const delivered = submitResult?.status === 'delivered'
  const canGoBack = stepIndex > 0 && !submitted

  const pick = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }))
    if (stepIndex < steps.length - 1) {
      window.setTimeout(() => setStepIndex((i) => i + 1), 260)
    }
  }

  const goBack = () => {
    if (!canGoBack) return
    setStepIndex((i) => Math.max(0, i - 1))
    const prev = steps[stepIndex - 1]
    if (prev?.type === 'text') {
      setTextValue(answers[prev.id] ?? '')
    }
  }

  const submit = () => {
    if (!textValue.trim() || sending) return
    setSending(true)

    void (async () => {
      const finalAnswers = { ...answers, [step.id]: textValue.trim() }
      setAnswers(finalAnswers)
      const result = await submitBrief(finalAnswers)
      setSubmitResult(result)
      setSubmitted(true)
      setSending(false)
    })()
  }

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Brief"
        path="/brief"
        description="Four friendly questions — we match a package from the pricing page and reply within 24 hours."
      />
      <header className="relative px-4 pb-6 pt-10 md:px-10 md:pt-14" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[60%] opacity-45" />
        <div className="relative mx-auto max-w-[640px]">
          <span className={cn(modernPill, 'bg-page-accent-2/20 text-page-text ring-1 ring-page-text/8')}>
            Quick brief
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Hi — let’s find the right package
          </h1>
          <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">
            Four short questions, about two minutes. We match something from{' '}
            <Link to="/pricing" className="text-page-accent underline-offset-2 hover:underline">
              Pricing
            </Link>{' '}
            and reply within 24 hours — usually in writing.
          </p>
        </div>
      </header>

      <section className="relative px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[640px]">
          <div
            className={cn(
              modernPanel,
              'overflow-hidden p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)] md:p-9',
            )}
          >
            {!submitted && (
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-page-muted">
                    Step {stepIndex + 1} of {steps.length}
                  </p>
                  {canGoBack && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-sm text-page-muted underline-offset-2 hover:text-page-text hover:underline"
                    >
                      ← Back
                    </button>
                  )}
                </div>
                <div className="flex gap-1.5" aria-hidden>
                  {steps.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-colors',
                        i <= stepIndex ? 'bg-page-accent' : 'bg-page-text/10',
                      )}
                    />
                  ))}
                </div>
                <div className="sr-only">{Math.round(progress)}% complete</div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  className="py-4 text-center md:py-8"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-page-accent-2/25 text-page-accent ring-1 ring-page-accent/20"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    </svg>
                  </motion.div>
                  <h2 className="mt-6 text-2xl font-bold tracking-tight">
                    {delivered ? 'Got it — thank you' : 'Almost there'}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-page-muted md:text-base">
                    {delivered
                      ? `We’ll write back within 24 hours${answers.contact ? ` at ${answers.contact}` : ''}. Meanwhile you can browse packages on Pricing.`
                      : `We couldn’t auto-deliver — please send the brief in Telegram (one tap below). We’ll still reply within 24 hours.`}
                  </p>
                  {!delivered && (
                    <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                      <motion.a
                        href={telegramMessageUrl(briefMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="rounded-full bg-[#00c2ff] px-6 py-3 text-sm font-medium text-page-text"
                      >
                        Send brief to Telegram
                      </motion.a>
                      <button
                        type="button"
                        onClick={() => void navigator.clipboard.writeText(briefMessage)}
                        className="rounded-full px-4 py-2 text-sm text-page-muted underline-offset-2 hover:text-page-text hover:underline"
                      >
                        Copy text
                      </button>
                    </div>
                  )}
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/pricing"
                      className="rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
                    >
                      See pricing
                    </Link>
                    <Link
                      to="/work"
                      className="rounded-full bg-page-bg px-5 py-2.5 text-sm ring-1 ring-page-text/10"
                    >
                      Browse work
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={SPRING}
                >
                  <h2 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    {step.question}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-page-muted">{step.help}</p>

                  {step.type === 'choice' && step.options && (
                    <div className="mt-6 grid gap-2.5">
                      {step.options.map((opt) => {
                        const selected = answers[step.id] === opt.label
                        return (
                          <motion.button
                            key={opt.label}
                            type="button"
                            onClick={() => pick(opt.label)}
                            whileTap={{ scale: 0.985 }}
                            transition={SPRING}
                            className={cn(
                              'w-full rounded-2xl px-5 py-4 text-left transition-colors ring-1',
                              selected
                                ? 'bg-page-accent text-page-bg ring-page-accent shadow-md'
                                : 'bg-page-bg/90 ring-page-text/10 hover:bg-page-surface hover:ring-page-text/20',
                            )}
                          >
                            <span className="block text-base font-semibold md:text-[17px]">
                              {opt.label}
                            </span>
                            {opt.hint && (
                              <span
                                className={cn(
                                  'mt-1 block text-sm leading-snug',
                                  selected ? 'text-page-bg/75' : 'text-page-muted',
                                )}
                              >
                                {opt.hint}
                              </span>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                  )}

                  {step.type === 'text' && (
                    <div className="mt-6">
                      <motion.div
                        animate={sending ? { scale: 0.98, opacity: 0.7 } : { scale: 1, opacity: 1 }}
                        transition={SPRING}
                      >
                        <input
                          value={textValue}
                          onChange={(e) => setTextValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && submit()}
                          placeholder={step.placeholder}
                          className="w-full rounded-2xl bg-page-bg px-5 py-4 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/35"
                          autoComplete="email"
                        />
                      </motion.div>
                      <motion.button
                        type="button"
                        onClick={submit}
                        disabled={!textValue.trim() || sending}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="mt-5 w-full rounded-full bg-page-text px-8 py-3.5 text-sm font-medium text-page-bg disabled:opacity-40 sm:w-auto"
                      >
                        {sending ? 'Sending…' : 'Send brief'}
                      </motion.button>
                      <p className="mt-4 text-xs leading-relaxed text-page-muted">
                        Prefer chat first?{' '}
                        <a
                          href={telegramMessageUrl('Hi NEO STUDIO — I’d like help picking a package.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-page-accent underline-offset-2 hover:underline"
                        >
                          Message us on Telegram
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-center text-sm text-page-muted">
            Already building with us? Use the{' '}
            <Link to="/revisions" className="text-page-accent underline-offset-2 hover:underline">
              revisions board
            </Link>{' '}
            instead.
          </p>
        </div>
      </section>
    </PageTransition>
  )
}
