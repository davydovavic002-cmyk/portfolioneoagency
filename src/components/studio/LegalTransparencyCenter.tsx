import { useState } from 'react'
import { motion } from 'framer-motion'
import { legalBlocks, legalCenterMeta, msaDocument, downloadMsaTemplate } from '@/data/legal'
import { LegalDocumentModal } from '@/components/studio/LegalDocumentModal'
import { ModernAmbient, modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

export function LegalTransparencyCenter() {
  const [msaOpen, setMsaOpen] = useState(false)

  return (
    <>
      <section id="legal" className="relative overflow-hidden px-4 py-12 md:px-10 md:py-16">
        <ModernAmbient className="bottom-0 left-1/2 -translate-x-1/2 opacity-50" />

        <div className="relative mx-auto max-w-[1120px]">
          <div className="mb-8 md:mb-10">
            <span className={cn(modernPill, 'bg-page-surface/80 text-page-muted ring-1 ring-page-text/10')}>
              {legalCenterMeta.label}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-4xl">
              {legalCenterMeta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-page-muted">
              {legalCenterMeta.subtitle}
            </p>
          </div>

          <div className="grid gap-4">
            {legalBlocks.map((block, index) => (
              <motion.article
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...SPRING, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className={cn(
                  modernPanel,
                  'group flex flex-col gap-5 p-6 transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.16)] md:flex-row md:items-center md:justify-between md:gap-8 md:p-8',
                )}
              >
                <div className="flex min-w-0 flex-1 gap-5 md:gap-6">
                  <span
                    className={cn(
                      modernPill,
                      'h-fit w-10 shrink-0 justify-center bg-page-text/8 text-page-muted tabular-nums',
                    )}
                  >
                    {block.code}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight md:text-lg">{block.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-page-muted md:text-[15px]">
                      {block.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:pl-4">
                  {block.action ? (
                    <>
                      <motion.button
                        type="button"
                        onClick={() => setMsaOpen(true)}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="w-full rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg transition-opacity hover:opacity-90 sm:w-auto"
                      >
                        Read on site
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => downloadMsaTemplate()}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="w-full rounded-full bg-page-bg px-5 py-2.5 text-center text-sm font-medium ring-1 ring-page-text/10 transition-opacity hover:opacity-80 sm:w-auto"
                      >
                        Download .md
                      </motion.button>
                    </>
                  ) : (
                    <span
                      className={cn(
                        modernPill,
                        'bg-page-accent-2/15 text-page-text',
                      )}
                    >
                      Included
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <LegalDocumentModal
        open={msaOpen}
        title="Master Service Agreement (MSA) — draft template"
        sections={msaDocument}
        onClose={() => setMsaOpen(false)}
      />
    </>
  )
}
