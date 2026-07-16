export type BentoVariant = 'hero' | 'stat' | 'stack' | 'tint-cyan' | 'tint-pink' | 'tint-neutral' | 'wide' | 'cta'

export interface StudioFeature {
  id: string
  title: string
  description: string
  className: string
  variant: BentoVariant
  tags?: string[]
  stat?: string
  statLabel?: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  timing?: string
}

export const studioIntro = {
  eyebrow: 'Studio',
  headline: 'Custom design. Clear prices. Mostly in writing.',
  lead:
    'NEO STUDIO SPACE builds websites and bots with a real custom UI — not a template with your logo stuck on. Remote team · Europe / Asia timezone · Est. 2021.',
  points: [
    {
      id: 'packages',
      label: '01',
      text: 'Landings from $400 · small sites from $500 · brand sites from $1,000 · stores from $2,000.',
    },
    {
      id: 'included',
      label: '02',
      text: 'Custom design, motion, 2 languages, SEO basics, and copy — yours or ours.',
    },
    {
      id: 'process',
      label: '03',
      text: 'Brief on the site → scope in writing → staging link early. Calls only if you want them.',
    },
    {
      id: 'handoff',
      label: '04',
      text: 'You get git + your hosting at the end, plus 2 weeks of launch support. Ongoing care from $350/mo.',
    },
  ],
}

export const studioWhy = {
  headline: 'Why people pick us',
  items: [
    {
      id: 'custom-price',
      title: 'Looks custom. Priced simply.',
      body: 'Designed sites in real code — React / Next / TypeScript — without agency theatre or a fragile one-person chat.',
    },
    {
      id: 'async',
      title: 'Written-first, not Zoom-first',
      body: 'Brief → scope in writing → feedback on staging. Telegram or email works fine. A call is optional.',
    },
    {
      id: 'one-team',
      title: 'Site and bot from one place',
      body: 'Storefront and a Telegram / SMS / widget bot? Same studio, one handoff, one story.',
    },
  ],
}

export const studioBuild = {
  headline: 'What we build',
  lead: 'Clear packages, one stack, realistic timelines.',
  items: [
    {
      id: 'sites',
      title: 'Sites & stores',
      body: 'Landings to e-commerce — custom layout every time. Add-ons like CRM, Stripe, or booking stay separate.',
    },
    {
      id: 'bots',
      title: 'Bots & agents',
      body: 'Starter $400 · Ops from $500 · AI from $1,000. You pay AI tokens on your own key — we say that upfront.',
    },
    {
      id: 'stack',
      title: 'Modern stack',
      body: 'React, Next.js, TypeScript, Tailwind — plus Python or a database when the product needs it.',
    },
    {
      id: 'speed',
      title: 'Typical timelines',
      body: 'Landing ~1–2 weeks · multi-page or store ~2–4 weeks · web app ~1–2 months when scope is clear.',
    },
  ],
}

export const studioAfterLaunch = {
  headline: 'After launch',
  items: [
    {
      id: 'handoff',
      title: 'You own the code',
      body: 'Git repo, deploy on your hosting, short how-to. We can host briefly during handoff if needed.',
    },
    {
      id: 'care',
      title: 'Ongoing project care',
      body: 'Two weeks of launch support included. Then $350/mo for written fixes and small content updates on your live project — not “support us”, support for your product.',
    },
  ],
}

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Short brief on the site',
    timing: 'Day 0',
    description:
      'What you need, rough timeline, and how to reach you. We reply in writing with a package fit — no required intro call.',
  },
  {
    id: '02',
    title: 'Agree the package',
    timing: '1–2 days',
    description:
      'Price, timeline, and what “done” means — confirmed in writing before we build.',
  },
  {
    id: '03',
    title: 'Build + staging link',
    timing: '1–4 weeks',
    description:
      'Preview URL early. Feedback in writing — one clear note at a time, no thread archaeology.',
  },
  {
    id: '04',
    title: 'Launch & handoff',
    timing: 'Ship',
    description:
      'Deploy to your hosting, hand over git, leave a short runbook. Two weeks of support, then optional monthly care.',
  },
]

/** @deprecated — replaced by studioBuild */
export const studioFeatures: StudioFeature[] = []

/** @deprecated */
export const studioPains = []

/** @deprecated */
export const manifesto = {
  label: studioIntro.eyebrow,
  headline: studioIntro.headline,
  paragraphs: [studioIntro.lead, ...studioIntro.points.map((p) => p.text)],
}

/** @deprecated */
export interface Competency {
  id: string
  title: string
  vectors: string[]
}

export const competencies: Competency[] = []

/** @deprecated */
export interface PipelineStep {
  id: string
  code: string
  title: string
  description: string
}

export const pipelineSteps: PipelineStep[] = processSteps.map((s) => ({
  id: s.id,
  code: s.timing ?? s.id,
  title: s.title,
  description: s.description,
}))
