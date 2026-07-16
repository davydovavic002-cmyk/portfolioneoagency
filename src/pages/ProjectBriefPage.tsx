import { Link, useLocation, Navigate } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { BriefWizard } from '@/components/brief/BriefWizard'
import { ModernAmbient, modernPill, sectionGradientStyle } from '@/components/ui/modernSurface'
import { PROJECT_BRIEF_STEPS } from '@/data/briefSteps'
import type { PricingLineItem } from '@/data/pricing'
import { formatLineItemPrice } from '@/data/pricing'
import { cn, formatPrice } from '@/lib/utils'
import type { BriefAnswers } from '@/lib/briefApi'

export interface ProjectBriefLocationState {
  selectedItems?: PricingLineItem[]
  total?: number
}

function buildExtraAnswers(state: ProjectBriefLocationState | null): BriefAnswers {
  const items = state?.selectedItems ?? []
  if (items.length === 0) return {}

  const total = state?.total ?? items.reduce((sum, item) => sum + item.price, 0)
  const hasFrom = items.some((item) => item.fromPrice)

  return {
    packages: items.map((item) => `${item.label} (${formatLineItemPrice(item)})`).join('; '),
    estimate: hasFrom ? `from ${formatPrice(total)}` : formatPrice(total),
  }
}

export function ProjectBriefPage() {
  const location = useLocation()
  const state = (location.state as ProjectBriefLocationState | null) ?? null
  const selectedItems = state?.selectedItems ?? []
  const extraAnswers = buildExtraAnswers(state)

  if (selectedItems.length === 0) {
    return <Navigate to="/pricing" replace />
  }

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Project brief"
        path="/brief/project"
        description="Design direction, content, and references — the follow-up after you pick packages on Pricing."
      />
      <header className="relative px-4 pb-6 pt-10 md:px-10 md:pt-14" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[60%] opacity-45" />
        <div className="relative mx-auto max-w-[640px]">
          <span className={cn(modernPill, 'bg-page-accent/15 text-page-text ring-1 ring-page-text/8')}>
            Project brief
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Now the fun part — design & details
          </h1>
          <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">
            You already picked packages on{' '}
            <Link to="/pricing" className="text-page-accent underline-offset-2 hover:underline">
              Pricing
            </Link>
            . These questions cover look, content, and references — so we can start without a call.
          </p>
          <ul className="mt-5 space-y-1.5 rounded-2xl bg-page-surface/80 px-4 py-3 text-sm ring-1 ring-page-text/10">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-3 text-page-muted">
                <span className="min-w-0">{item.label}</span>
                <span className="shrink-0 tabular-nums text-page-text">
                  {formatLineItemPrice(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="relative px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[640px]">
          <BriefWizard
            steps={PROJECT_BRIEF_STEPS}
            source="project-brief"
            extraAnswers={extraAnswers}
            successDelivered={`We’ll write back within 24 hours with next steps for your selection.`}
            secondaryCta={{ to: '/pricing', label: 'Back to pricing' }}
            telegramPrefill="Hi NEO STUDIO — I picked packages and want to share project details."
          />
        </div>
      </section>
    </PageTransition>
  )
}
