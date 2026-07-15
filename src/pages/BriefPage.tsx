import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { MorphButton } from '@/components/ui/MorphButton'
import { AestheticPromptBar } from '@/components/ui/AestheticPromptBar'
import { ModernAmbient, modernPanel, modernPill, sectionGradientStyle } from '@/components/ui/modernSurface'
import { formatBriefMessage, submitBrief, type BriefSubmitResult } from '@/lib/briefApi'
import { telegramMessageUrl } from '@/data/site'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface Step {
  id: string
  question: string
  type: 'choice' | 'text'
  options?: string[]
  placeholder?: string
}

const steps: Step[] = [
  {
    id: 'type',
    question: 'What are we building together?',
    type: 'choice',
    options: ['Web Platform', 'Mobile App', 'AI Agent / Bot', 'Product Redesign'],
  },
  {
    id: 'budget',
    question: 'What budget range feels right?',
    type: 'choice',
    options: ['$1.6K – $6K', '$6K – $12K', '$12K – $25K', '$25K+'],
  },
  {
    id: 'timeline',
    question: 'When do you want to launch?',
    type: 'choice',
    options: ['1–2 months', '3–4 months', '5–6 months', 'Flexible'],
  },
  {
    id: 'contact',
    question: 'How should we reach you?',
    type: 'text',
    placeholder: 'hello@company.com or @telegram',
  },
]

export function BriefPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [textValue, setTextValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sucking, setSucking] = useState(false)
  const [submitResult, setSubmitResult] = useState<BriefSubmitResult | null>(null)

  const step = steps[stepIndex]
  const progress = ((stepIndex + (submitted ? 1 : 0)) / steps.length) * 100
  const briefMessage = formatBriefMessage(answers)
  const delivered = submitResult?.status === 'delivered'

  const pick = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }))
    if (stepIndex < steps.length - 1) {
      window.setTimeout(() => setStepIndex((i) => i + 1), 280)
    }
  }

  const submit = () => {
    if (!textValue.trim() || sucking) return
    setSucking(true)

    void (async () => {
      const finalAnswers = { ...answers, [step.id]: textValue.trim() }
      setAnswers(finalAnswers)
      const result = await submitBrief(finalAnswers)
      setSubmitResult(result)
      setSubmitted(true)
      setSucking(false)
    })()
  }

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Brief"
        path="/brief"
        description="Four quick questions — we match a package and reply within 24 hours."
      />
      <header className="relative px-4 pb-4 pt-10 md:px-10 md:pt-14" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[60%] opacity-40" />
        <div className="relative mx-auto max-w-[720px]">
          <span className={cn(modernPill, 'bg-page-surface/80 text-page-muted ring-1 ring-page-text/10')}>
            Brief
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Tell us about your project
          </h1>
          <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">
            Four quick questions — about 2 minutes. We&apos;ll match a package and get back within
            24 hours.
          </p>
        </div>
      </header>

      <section className="relative px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[720px] space-y-6">
          <AestheticPromptBar />

          <div className={cn(modernPanel, 'overflow-hidden p-6 md:p-10')}>
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs text-page-muted">
                <span>
                  Step {Math.min(stepIndex + 1, steps.length)} of {steps.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-page-bg ring-1 ring-page-text/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-page-accent-2 to-page-accent"
                  animate={{ width: `${progress}%` }}
                  transition={SPRING}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  className="py-6 text-center md:py-10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -120 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={SPRING}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-page-accent text-page-bg shadow-lg"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    </svg>
                  </motion.div>
                  <h2 className="mt-6 text-2xl font-bold">
                    {delivered ? 'Brief delivered' : 'Brief ready'}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-page-muted">
                    {delivered
                      ? `We received it — reply within 24 hours${answers.contact ? ` at ${answers.contact}` : ''}.`
                      : `API offline or Telegram not configured — send manually and we'll reply within 24 hours${answers.contact ? ` at ${answers.contact}` : ''}.`}
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
                </motion.div>
              ) : (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={SPRING}
                >
                  <h2 className="text-xl font-semibold leading-snug md:text-2xl">{step.question}</h2>

                  {step.type === 'choice' && step.options && (
                    <div className="mt-6 grid gap-2">
                      {step.options.map((opt) => (
                        <MorphButton
                          key={opt}
                          label={opt}
                          selected={answers[step.id] === opt}
                          onClick={() => pick(opt)}
                        />
                      ))}
                    </div>
                  )}

                  {step.type === 'text' && (
                    <div className="mt-6">
                      <motion.div
                        animate={
                          sucking ? { scale: 0.96, opacity: 0.6 } : { scale: 1, opacity: 1 }
                        }
                        transition={SPRING}
                      >
                        <input
                          value={textValue}
                          onChange={(e) => setTextValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && submit()}
                          placeholder={step.placeholder}
                          className="w-full rounded-xl bg-page-bg px-5 py-4 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/40"
                        />
                      </motion.div>
                      <motion.button
                        type="button"
                        onClick={submit}
                        disabled={!textValue.trim() || sucking}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="mt-4 rounded-full bg-page-text px-8 py-3 text-sm font-medium text-page-bg disabled:opacity-40"
                      >
                        {sucking ? 'Sending…' : 'Finish brief'}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
