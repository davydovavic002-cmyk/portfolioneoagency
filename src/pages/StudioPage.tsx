import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { StudioBento } from '@/components/studio/StudioBento'
import { LegalTransparencyCenter } from '@/components/studio/LegalTransparencyCenter'
import { ModernAmbient, sectionGradientStyle } from '@/components/ui/modernSurface'

export function StudioPage() {
  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Studio"
        path="/studio"
        description="How we work — custom architecture, staging URLs, and end-to-end delivery."
      />
      <header className="relative pb-8 md:pb-12" style={sectionGradientStyle()}>
        <ModernAmbient className="top-[-20%] right-[-10%] left-auto w-[70%] translate-x-0 opacity-50" />

        <div className="relative mx-auto max-w-[1120px] px-6 pt-16 pb-4 md:px-10 md:pt-20">
          <span className="inline-flex rounded-full bg-page-surface/80 px-3 py-1 text-xs font-medium text-page-muted ring-1 ring-page-text/10 backdrop-blur-sm">
            Studio
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            How we work, what we build
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-page-muted md:text-lg">
            No pitch decks or template shops — a small team that designs and ships custom full-stack
            products, end to end.
          </p>
        </div>
      </header>

      <StudioBento />
      <LegalTransparencyCenter />
    </PageTransition>
  )
}
