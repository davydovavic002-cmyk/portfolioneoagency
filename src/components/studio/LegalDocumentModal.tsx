import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { downloadMsaTemplate, type LegalDocumentSection } from '@/data/legal'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface LegalDocumentModalProps {
  open: boolean
  title: string
  sections: LegalDocumentSection[]
  onClose: () => void
}

export function LegalDocumentModal({ open, title, sections, onClose }: LegalDocumentModalProps) {
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close document"
            className="absolute inset-0 bg-page-text/50"
            onClick={onClose}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-document-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={SPRING}
            className="relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-page-surface shadow-[0_32px_100px_-20px_rgba(0,0,0,0.35)] ring-1 ring-page-text/10 md:rounded-3xl"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-page-text/10 bg-page-bg px-5 py-4 md:px-8">
              <div>
                <p className="text-xs font-medium text-page-muted">Legal document</p>
                <h2 id="legal-document-title" className="mt-0.5 text-base font-semibold tracking-tight md:text-lg">
                  {title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => downloadMsaTemplate()}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="rounded-full bg-page-bg px-4 py-2 text-sm font-medium ring-1 ring-page-text/10 transition-opacity hover:opacity-80"
                >
                  Download
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="rounded-full bg-page-text px-4 py-2 text-sm font-medium text-page-bg transition-opacity hover:opacity-90"
                >
                  Close
                </motion.button>
              </div>
            </header>

            <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              {sections.length === 0 ? (
                <p className="text-sm text-page-muted">Document could not be loaded. Try Download instead.</p>
              ) : (
                <div className="space-y-8">
                  {sections.map((section) => (
                    <section key={section.heading} className="border-b border-page-text/10 pb-6 last:border-b-0">
                      <h3 className="text-sm font-semibold tracking-tight">{section.heading}</h3>
                      <div className="mt-3 space-y-3">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-page-muted">
                            {paragraph}
                          </p>
                        ))}
                        {section.bullets && (
                          <ul className="space-y-1.5 border-l border-page-text/30 pl-4">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="text-sm leading-relaxed text-page-muted">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              )}

              <p className="mt-8 border-t border-page-text/10 pt-4 text-xs text-page-muted">
                Draft for review only — not legally binding until executed by both parties.
              </p>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
