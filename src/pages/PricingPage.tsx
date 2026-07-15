import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { PricingMatrix } from '@/components/pricing/PricingMatrix'
import { ModernAmbient, sectionGradientStyle } from '@/components/ui/modernSurface'
import { PRICING_TIER_GROUPS, PROJECT_BASE_FEE, pricingLineItems } from '@/data/pricing'

export function PricingPage() {
  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Pricing"
        path="/pricing"
        description="Fixed-scope packages with clear timelines, deliverables, and transparent pricing."
      />
      <section className="relative px-4 pb-8 pt-14 md:px-10 md:pt-16" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[55%] opacity-40" />
        <div className="relative mx-auto max-w-[1120px]">
          <span className="inline-flex rounded-full bg-page-surface/80 px-3 py-1 text-xs font-medium text-page-muted ring-1 ring-page-text/10">
            Pricing
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Fixed-scope packages
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-page-muted md:text-lg">
            Transparent pricing from the studio portfolio — pick one package or combine levels.
            Every item has a clear timeline, deliverables, and fixed price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-12 md:px-10">
        <PricingMatrix
          groups={PRICING_TIER_GROUPS}
          items={pricingLineItems}
          baseFee={PROJECT_BASE_FEE}
        />
      </section>
    </PageTransition>
  )
}
