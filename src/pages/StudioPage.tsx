import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { StudioBento } from '@/components/studio/StudioBento'
import { LegalTransparencyCenter } from '@/components/studio/LegalTransparencyCenter'
import { ModernAmbient, sectionGradientStyle } from '@/components/ui/modernSurface'
import { studioIntro } from '@/data/studio'

export function StudioPage() {
  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Studio"
        path="/studio"
        description="Custom sites and bots — clear packages from $400, written-first process. Remote studio, Europe / Asia timezone."
      />
      <header className="relative pb-4 md:pb-6" style={sectionGradientStyle()}>
        <ModernAmbient className="top-[-20%] right-[-10%] left-auto w-[70%] translate-x-0 opacity-50" />

        <div className="relative mx-auto max-w-[1120px] px-6 pt-16 md:px-10 md:pt-20">
          <span className="inline-flex rounded-full bg-page-surface/80 px-3 py-1 text-xs font-medium text-page-muted ring-1 ring-page-text/10 backdrop-blur-sm">
            {studioIntro.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            {studioIntro.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-page-muted md:text-lg">
            {studioIntro.lead}
          </p>
        </div>
      </header>

      <StudioBento />
      <LegalTransparencyCenter />
    </PageTransition>
  )
}
