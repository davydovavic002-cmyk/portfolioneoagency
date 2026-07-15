import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'

export function NotFoundPage() {
  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo title="Page not found" path="/404" noIndex description="This page does not exist." />
      <div className="mx-auto flex max-w-[720px] flex-col px-4 py-24 md:px-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-page-muted">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-4 text-base text-page-muted">
          That route doesn&apos;t exist — try Work, Studio, or start a brief.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
          >
            Home
          </Link>
          <Link
            to="/work"
            className="rounded-full bg-page-surface px-5 py-2.5 text-sm font-medium ring-1 ring-page-text/10"
          >
            Work
          </Link>
          <Link
            to="/brief"
            className="rounded-full bg-page-surface px-5 py-2.5 text-sm font-medium ring-1 ring-page-text/10"
          >
            Brief
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
