import { Link } from 'react-router-dom'
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
        description="Custom-designed sites from $400, stores from $2,000, bots in the same band (you pay AI tokens), and $350/mo care."
      />
      <section className="relative px-4 pb-8 pt-14 md:px-10 md:pt-16" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[55%] opacity-40" />
        <div className="relative mx-auto max-w-[1120px]">
          <span className="inline-flex rounded-full bg-page-surface/80 px-3 py-1 text-xs font-medium text-page-muted ring-1 ring-page-text/10">
            Pricing
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Pick a package. Add what you need.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-page-muted md:text-lg">
            Every site is custom-designed — not a template. Tick the packages below for a rough total,
            then send it to us or{' '}
            <Link to="/brief" className="text-page-accent underline-offset-2 hover:underline">
              fill the brief
            </Link>
            . AI token usage on bots is billed to your own key. After launch:{' '}
            <span className="text-page-text">Ongoing project care</span> ($350/mo) for written fixes on
            your live site.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-12 pb-20 md:px-10 lg:pb-12">
        <PricingMatrix
          groups={PRICING_TIER_GROUPS}
          items={pricingLineItems}
          baseFee={PROJECT_BASE_FEE}
        />
      </section>
    </PageTransition>
  )
}
