import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { ModernAmbient, modernPanel, modernPill, sectionGradientStyle } from '@/components/ui/modernSurface'
import {
  formatRevisionMessage,
  submitRevision,
  type RevisionSubmitResult,
} from '@/lib/revisionApi'
import { telegramMessageUrl, telegramProfileUrl } from '@/data/site'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

export function RevisionsPage() {
  const [projectCode, setProjectCode] = useState('')
  const [contact, setContact] = useState('')
  const [pageUrl, setPageUrl] = useState('')
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitResult, setSubmitResult] = useState<RevisionSubmitResult | null>(null)

  const canSubmit =
    projectCode.trim().length > 0 &&
    contact.trim().length > 0 &&
    message.trim().length > 0 &&
    !sending

  const revisionMessage = formatRevisionMessage({
    projectCode: projectCode.trim(),
    contact: contact.trim(),
    pageUrl: pageUrl.trim() || undefined,
    priority,
    message: message.trim(),
  })
  const delivered = submitResult?.status === 'delivered'

  const submit = () => {
    if (!canSubmit) return
    setSending(true)

    void (async () => {
      const result = await submitRevision({
        projectCode: projectCode.trim(),
        contact: contact.trim(),
        pageUrl: pageUrl.trim() || undefined,
        priority,
        message: message.trim(),
      })
      setSubmitResult(result)
      setSubmitted(true)
      setSending(false)
    })()
  }

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Revisions"
        path="/revisions"
        description="Written revision board for active NEO projects — leave feedback on staging without scheduling a call."
      />
      <header className="relative px-4 pb-4 pt-10 md:px-10 md:pt-14" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[60%] opacity-40" />
        <div className="relative mx-auto max-w-[720px]">
          <span className={cn(modernPill, 'bg-page-surface/80 text-page-muted ring-1 ring-page-text/10')}>
            Revisions board
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Leave feedback in writing
          </h1>
          <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">
            For active projects on staging. One note per request — page, what to change, why.
            We reply in writing. New work starts with the{' '}
            <Link to="/brief" className="text-page-accent underline-offset-2 hover:underline">
              brief
            </Link>
            .
          </p>
        </div>
      </header>

      <section className="relative px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-6 rounded-2xl border border-page-accent/25 bg-page-accent/10 px-5 py-4 text-sm leading-relaxed text-page-muted">
            This board is paused for now — please send staging feedback via{' '}
            <a href={telegramProfileUrl()} className="text-page-accent underline-offset-2 hover:underline">
              Telegram
            </a>{' '}
            or email. The form below still works if you have the direct link.
          </div>
          <div className={cn(modernPanel, 'overflow-hidden p-6 md:p-10')}>
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
                    {delivered ? 'Revision received' : 'Revision ready'}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-page-muted">
                    {delivered
                      ? 'We got it — expect a written reply within 1–2 business days.'
                      : 'API offline or Telegram not configured — send manually and we’ll reply in writing.'}
                  </p>
                  {!delivered && (
                    <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                      <motion.a
                        href={telegramMessageUrl(revisionMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="rounded-full bg-[#00c2ff] px-6 py-3 text-sm font-medium text-page-text"
                      >
                        Send to Telegram
                      </motion.a>
                      <button
                        type="button"
                        onClick={() => void navigator.clipboard.writeText(revisionMessage)}
                        className="rounded-full px-4 py-2 text-sm text-page-muted underline-offset-2 hover:text-page-text hover:underline"
                      >
                        Copy text
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setSubmitResult(null)
                      setMessage('')
                    }}
                    className="mt-8 text-sm text-page-muted underline-offset-2 hover:text-page-text hover:underline"
                  >
                    Submit another note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={SPRING}
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    submit()
                  }}
                >
                  <div>
                    <label htmlFor="projectCode" className="text-sm font-medium">
                      Project code or name
                    </label>
                    <input
                      id="projectCode"
                      value={projectCode}
                      onChange={(e) => setProjectCode(e.target.value)}
                      placeholder="e.g. AURA · staging or code from kickoff"
                      className="mt-2 w-full rounded-xl bg-page-bg px-5 py-3.5 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/40"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact" className="text-sm font-medium">
                      Your contact
                    </label>
                    <input
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="email or @neostudio_space"
                      className="mt-2 w-full rounded-xl bg-page-bg px-5 py-3.5 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/40"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pageUrl" className="text-sm font-medium">
                      Page / screen URL <span className="font-normal text-page-muted">(optional)</span>
                    </label>
                    <input
                      id="pageUrl"
                      value={pageUrl}
                      onChange={(e) => setPageUrl(e.target.value)}
                      placeholder="https://staging… or section name"
                      className="mt-2 w-full rounded-xl bg-page-bg px-5 py-3.5 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/40"
                      autoComplete="url"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(
                        [
                          { id: 'normal', label: 'Normal' },
                          { id: 'urgent', label: 'Urgent (blocks launch)' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPriority(opt.id)}
                          className={cn(
                            'rounded-full px-4 py-2 text-sm transition-colors ring-1',
                            priority === opt.id
                              ? 'bg-page-text text-page-bg ring-page-text'
                              : 'bg-page-bg text-page-muted ring-page-text/10 hover:text-page-text',
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium">
                      What should change?
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="Current → desired. Include links or screenshots in Telegram if needed."
                      className="mt-2 w-full resize-y rounded-xl bg-page-bg px-5 py-3.5 text-base outline-none ring-1 ring-page-text/10 focus:ring-2 focus:ring-page-accent/40"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!canSubmit}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING}
                    className="rounded-full bg-page-text px-8 py-3 text-sm font-medium text-page-bg disabled:opacity-40"
                  >
                    {sending ? 'Sending…' : 'Send revision'}
                  </motion.button>

                  <p className="text-xs leading-relaxed text-page-muted">
                    Included during build + 2 weeks after launch. Ongoing care is the{' '}
                    <Link to="/pricing" className="text-page-accent underline-offset-2 hover:underline">
                      Ongoing project care
                    </Link>{' '}
                    package.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
