import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/lib/theme'
import { SmoothScroll, ScrollToTop } from '@/components/layout/SmoothScroll'
import { Navigation } from '@/components/layout/Navigation'
import { HomePage } from '@/pages/HomePage'
import { CasesPage } from '@/pages/CasesPage'
import { CaseDetailRoute } from '@/pages/CaseDetailRoute'
import { StudioPage } from '@/pages/StudioPage'
import { PricingPage } from '@/pages/PricingPage'
import { BriefPage } from '@/pages/BriefPage'
import { ProjectBriefPage } from '@/pages/ProjectBriefPage'
import { RevisionsPage } from '@/pages/RevisionsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SITE, telegramProfileUrl } from '@/data/site'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<CasesPage />} />
        <Route path="/work/:caseId" element={<CaseDetailRoute />} />
        <Route path="/portfolio" element={<Navigate to="/work" replace />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/brief" element={<BriefPage />} />
        <Route path="/brief/project" element={<ProjectBriefPage />} />
        <Route path="/revisions" element={<RevisionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <Navigation />
          <AnimatedRoutes />
          <footer className="border-t-2 border-page-text px-4 py-8 md:px-10">
            <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 md:flex-row">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase">
                © 2026 NEO STUDIO SPACE
              </span>
              <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
                <a href={`mailto:${SITE.email}`} className="hover:text-page-accent">
                  {SITE.email}
                </a>
                <a
                  href={telegramProfileUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-page-accent"
                >
                  @{SITE.telegram}
                </a>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  )
}
