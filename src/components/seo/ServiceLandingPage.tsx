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
    <div className="relative min-h-dvh overflow-y-auto bg-[#080808] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(96,165,250,0.1)_0%,transparent_55%)]" />

      <header className="relative border-b border-white/[0.06] px-5 py-6 lg:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link href="/" className="transition opacity-90 hover:opacity-100">
            <NeoLogo showWordmark />
          </Link>
          <nav className="flex items-center gap-4 text-[12px]">
            <Link href="/" className="text-zinc-500 transition hover:text-zinc-300">
              Portfolio
            </Link>
            <Link
              href={briefLink}
              className="rounded-full border border-white/[0.1] px-3 py-1.5 text-zinc-300 transition hover:border-white/[0.18] hover:text-zinc-100"
            >
              Project brief
            </Link>
          </nav>
        </div>
      </header>

      <article className="relative mx-auto max-w-3xl px-5 py-10 lg:px-10 lg:py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-600">
          {page.heroEyebrow}
        </p>
        <h1 className="font-display mt-4 text-4xl tracking-[-0.03em] text-zinc-50 lg:text-5xl">
          {page.heroTitle}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-400 lg:text-base">
          {page.heroSubtitle}
        </p>

        <div className="mt-10 space-y-5 text-[15px] leading-[1.75] text-zinc-400">
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-zinc-50">
            {page.includesTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {page.includes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[14px] leading-relaxed text-zinc-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400/80" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-zinc-50">
            {page.processTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <p className="text-[11px] tabular-nums text-zinc-600">0{index + 1}</p>
                <h3 className="mt-2 text-[15px] font-medium text-zinc-200">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Case study</p>
          <h2 className="font-display mt-3 text-2xl text-zinc-50">{page.caseStudy.title}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">
            {page.caseStudy.summary}
          </p>
          <a
            href={page.caseStudy.href}
            target={page.caseStudy.href.startsWith("http") ? "_blank" : undefined}
            rel={page.caseStudy.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex items-center gap-2 text-[13px] text-blue-300 transition hover:text-blue-200"
          >
            View live project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </section>

        <section className="mt-14 rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6 lg:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Fixed-scope package
          </p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl text-zinc-50">{page.package.name}</h2>
            <p className="font-display text-3xl text-blue-300">{page.package.price}</p>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-zinc-600">
            Timeline: {page.package.timeline}
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">
            {page.package.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-[12px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.1]"
            >
              Message on Telegram
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href={briefLink}
              className="rounded-full border border-white/[0.08] px-5 py-2.5 text-[12px] text-zinc-400 transition hover:border-white/[0.14] hover:text-zinc-200"
            >
              Take the project brief
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-zinc-50">FAQ</h2>
          <div className="mt-6 space-y-6">
            {page.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-[15px] font-medium text-zinc-200">{item.question}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center lg:p-10">
          <h2 className="font-display text-2xl text-zinc-50">{page.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-zinc-500">
            {page.ctaSubtitle}
          </p>
          <Link
            href={briefLink}
            className="mt-6 inline-flex rounded-full border border-white/[0.14] bg-white/[0.06] px-6 py-3 text-[13px] font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.1]"
          >
            Start the 2-min brief
          </Link>
        </section>

        <footer className="mt-16 border-t border-white/[0.06] pt-8 pb-12">
          <p className="text-[12px] text-zinc-600">
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}.{" "}
            <Link href="/" className="text-zinc-500 transition hover:text-zinc-400">
              Back to portfolio
            </Link>
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-zinc-600">
            <Link href="/services/web-design" className="transition hover:text-zinc-400">
              Web design
            </Link>
            <Link href="/services/landing-page" className="transition hover:text-zinc-400">
              Landing page
            </Link>
            <Link href="/services/telegram-bot" className="transition hover:text-zinc-400">
              Telegram bot
            </Link>
            <Link href="/services/ai-automation" className="transition hover:text-zinc-400">
              AI automation
            </Link>
          </nav>
        </footer>
      </article>
    </div>
  );
}
