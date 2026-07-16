import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { BriefWizard } from '@/components/brief/BriefWizard'
import { ModernAmbient, modernPill, sectionGradientStyle } from '@/components/ui/modernSurface'
import { MAIN_BRIEF_STEPS } from '@/data/briefSteps'
import { cn } from '@/lib/utils'

export function BriefPage() {
  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Brief"
        path="/brief"
        description="Five friendly questions about your project — we reply within 24 hours, usually in writing."
      />
      <header className="relative px-4 pb-6 pt-10 md:px-10 md:pt-14" style={sectionGradientStyle()}>
        <ModernAmbient className="right-0 top-0 left-auto w-[60%] opacity-45" />
        <div className="relative mx-auto max-w-[640px]">
          <span className={cn(modernPill, 'bg-page-accent-2/20 text-page-text ring-1 ring-page-text/8')}>
            Quick brief
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Hi — tell us about the project
          </h1>
          <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">
            Five short questions, about two minutes. We reply within 24 hours — usually in writing. Already
            picked packages on{' '}
            <Link to="/pricing" className="text-page-accent underline-offset-2 hover:underline">
              Pricing
            </Link>
            ? Use the project brief there instead.
          </p>
        </div>
      </header>

      <section className="relative px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[640px]">
          <BriefWizard
            steps={MAIN_BRIEF_STEPS}
            source="brief-form"
            secondaryCta={{ to: '/pricing', label: 'See pricing' }}
            telegramPrefill="Hi NEO STUDIO — I’d like to talk about a project."
          />

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
