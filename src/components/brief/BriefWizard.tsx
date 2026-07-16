import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { BriefStep } from '@/data/briefSteps'
import { formatBriefMessage, submitBrief, type BriefAnswers, type BriefSubmitResult } from '@/lib/briefApi'
import { telegramMessageUrl } from '@/data/site'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface BriefWizardProps {
  steps: BriefStep[]
  source: string
  extraAnswers?: BriefAnswers
  successTitle?: string
  successDelivered?: string
  successFallback?: string
  secondaryCta?: { to: string; label: string }
  telegramPrefill?: string
}

export function BriefWizard({
  steps,
  source,
  extraAnswers = {},
  successTitle = 'Got it — thank you',
  successDelivered,
  successFallback,
  secondaryCta = { to: '/work', label: 'Browse work' },
  telegramPrefill = 'Hi NEO STUDIO — I’d like to start a project.',
}: BriefWizardProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<BriefAnswers>({})
  const [textValue, setTextValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitResult, setSubmitResult] = useState<BriefSubmitResult | null>(null)

  const step = steps[stepIndex]
  const progress = ((stepIndex + (submitted ? 1 : 0)) / steps.length) * 100
  const allAnswers = { ...extraAnswers, ...answers }
  const briefMessage = formatBriefMessage(allAnswers, source)
  const delivered = submitResult?.status === 'delivered'
  const canGoBack = stepIndex > 0 && !submitted

  const sendBrief = (nextAnswers: BriefAnswers) => {
    setSending(true)
    void (async () => {
      const result = await submitBrief({ ...extraAnswers, ...nextAnswers }, source)
      setSubmitResult(result)
      setSubmitted(true)
      setSending(false)
    })()
  }

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
      setTextValue(answers[prev.id as keyof BriefAnswers] ?? '')
    }
  }

  const submitText = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed && !step.optional) return
    if (sending) return

    const nextAnswers = { ...answers, [step.id]: trimmed || '—' }
    setAnswers(nextAnswers)

    if (stepIndex < steps.length - 1) {
      window.setTimeout(() => setStepIndex((i) => i + 1), 260)
      setTextValue('')
      return
    }

    sendBrief(nextAnswers)
  }

  const skipOptional = () => {
    if (!step.optional || sending) return
    const nextAnswers = { ...answers, [step.id]: '—' }
    setAnswers(nextAnswers)

    if (stepIndex < steps.length - 1) {
      window.setTimeout(() => setStepIndex((i) => i + 1), 160)
      setTextValue('')
      return
    }

    sendBrief(nextAnswers)
  }

  const contact = allAnswers.contact
  const deliveredMessage =
    successDelivered ??
    `We’ll write back within 24 hours${contact && contact !== '—' ? ` at ${contact}` : ''}.`
  const fallbackMessage =
    successFallback ??
    'We couldn’t auto-deliver — please send the brief in Telegram (one tap below). We’ll still reply within 24 hours.'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-page-surface/90 p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)] ring-1 ring-page-text/10 md:p-9',
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
              {delivered ? successTitle : 'Almost there'}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-page-muted md:text-base">
              {delivered ? deliveredMessage : fallbackMessage}
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
                to={secondaryCta.to}
                className="rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
              >
                {secondaryCta.label}
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
                  const selected = answers[step.id as keyof BriefAnswers] === opt.label
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
                      <span className="block text-base font-semibold md:text-[17px]">{opt.label}</span>
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
                    onKeyDown={(e) => e.key === 'Enter' && submitText(textValue)}
                    placeholder={step.placeholder}
                    className="w-full rounded-2xl bg-page-bg px-5 py-4 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/35"
                    autoComplete={step.id === 'contact' ? 'email' : 'off'}
                  />
                </motion.div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={() => submitText(textValue)}
                    disabled={(!textValue.trim() && !step.optional) || sending}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING}
                    className="rounded-full bg-page-text px-8 py-3.5 text-sm font-medium text-page-bg disabled:opacity-40"
                  >
                    {sending
                      ? 'Sending…'
                      : stepIndex === steps.length - 1
                        ? 'Send brief'
                        : step.optional
                          ? 'Continue'
                          : 'Continue'}
                  </motion.button>
                  {step.optional && (
                    <button
                      type="button"
                      onClick={skipOptional}
                      disabled={sending}
                      className="text-sm text-page-muted underline-offset-2 hover:text-page-text hover:underline disabled:opacity-40"
                    >
                      Skip
                    </button>
                  )}
                </div>
                {step.id === 'contact' && (
                  <p className="mt-4 text-xs leading-relaxed text-page-muted">
                    Prefer chat first?{' '}
                    <a
                      href={telegramMessageUrl(telegramPrefill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-page-accent underline-offset-2 hover:underline"
                    >
                      Message us on Telegram
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
