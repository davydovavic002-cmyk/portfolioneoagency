"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NeoLogo } from "@/components/brand/NeoLogo";
import { SITE_CONFIG } from "@/config/site";
import type { ServicePageContent } from "@/lib/seo/service-pages";

interface ServiceLandingPageProps {
  page: ServicePageContent;
}

function briefHref(projectType: ServicePageContent["briefProjectType"]) {
  return `/?brief=1&type=${projectType}`;
}

export function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const briefLink = briefHref(page.briefProjectType);

  return (
    <div className="relative min-h-dvh overflow-y-auto bg-canvas text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,71,255,0.06)_0%,transparent_55%)]" />

      <header className="relative border-b border-black/10 bg-paper/80 px-5 py-6 backdrop-blur-sm lg:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link href="/" className="transition opacity-90 hover:opacity-100">
            <NeoLogo showWordmark />
          </Link>
          <nav className="flex items-center gap-4 text-[12px]">
            <Link href="/" className="text-muted transition hover:text-ink">
              Portfolio
            </Link>
            <Link
              href={briefLink}
              className="rounded-full border border-black/12 px-3 py-1.5 text-ink transition hover:border-accent/30 hover:text-accent"
            >
              Project brief
            </Link>
          </nav>
        </div>
      </header>

      <article className="relative mx-auto max-w-3xl px-5 py-10 lg:px-10 lg:py-14">
        <p className="section-label">{page.heroEyebrow}</p>
        <h1 className="font-display mt-4 text-4xl tracking-[-0.03em] text-ink lg:text-5xl">
          {page.heroTitle}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted lg:text-base">
          {page.heroSubtitle}
        </p>

        <div className="mt-10 space-y-5 text-[15px] leading-[1.75] text-muted">
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-ink">
            {page.includesTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {page.includes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[14px] leading-relaxed text-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-ink">
            {page.processTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-black/10 bg-paper p-5"
              >
                <p className="text-[11px] tabular-nums text-faint">0{index + 1}</p>
                <h3 className="mt-2 text-[15px] font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-black/10 bg-paper p-6 lg:p-8">
          <p className="section-label">Case study</p>
          <h2 className="font-display mt-3 text-2xl text-ink">{page.caseStudy.title}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {page.caseStudy.summary}
          </p>
          <a
            href={page.caseStudy.href}
            target={page.caseStudy.href.startsWith("http") ? "_blank" : undefined}
            rel={page.caseStudy.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex items-center gap-2 text-[13px] text-accent transition hover:text-accent/80"
          >
            View live project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </section>

        <section className="mt-14 rounded-2xl border border-accent/20 bg-accent-soft p-6 lg:p-8">
          <p className="section-label">Fixed-scope package</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">{page.package.name}</h2>
            <p className="font-display text-3xl text-accent">{page.package.price}</p>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-faint">
            Timeline: {page.package.timeline}
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            {page.package.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12px] font-medium text-white transition hover:bg-accent/90"
            >
              Message on Telegram
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href={briefLink}
              className="rounded-full border border-black/12 px-5 py-2.5 text-[12px] text-muted transition hover:border-black/20 hover:text-ink"
            >
              Take the project brief
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-ink">FAQ</h2>
          <div className="mt-6 space-y-6">
            {page.faq.map((item) => (
              <div key={item.question} className="border-b border-black/8 pb-6 last:border-0">
                <h3 className="text-[15px] font-medium text-ink">{item.question}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-black/10 bg-paper p-6 text-center lg:p-10">
          <h2 className="font-display text-2xl text-ink">{page.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-muted">
            {page.ctaSubtitle}
          </p>
          <Link
            href={briefLink}
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-[13px] font-medium text-white transition hover:bg-accent/90"
          >
            Start the 2-min brief
          </Link>
        </section>

        <footer className="mt-16 border-t border-black/10 pt-8 pb-12">
          <p className="text-[12px] text-faint">
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}.{" "}
            <Link href="/" className="text-muted transition hover:text-ink">
              Back to portfolio
            </Link>
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-faint">
            <Link href="/services/web-design" className="transition hover:text-muted">
              Web design
            </Link>
            <Link href="/services/landing-page" className="transition hover:text-muted">
              Landing page
            </Link>
            <Link href="/services/telegram-bot" className="transition hover:text-muted">
              Telegram bot
            </Link>
            <Link href="/services/ai-automation" className="transition hover:text-muted">
              AI automation
            </Link>
          </nav>
        </footer>
      </article>
    </div>
  );
}
