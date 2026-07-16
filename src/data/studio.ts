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

export interface PainPoint {
  id: string
  title: string
  body: string
}

export const studioIntro = {
  eyebrow: 'Studio',
  headline: 'Custom design. Clear prices. Mostly in writing.',
  lead:
    'NEO STUDIO SPACE builds websites and bots with a real custom UI — not a template with your logo stuck on. Remote team, Europe / Asia timezone. Est. 2021.',
  points: [
    'Landings from $400. Small sites from $500. Brand sites from $1,000. Stores from $2,000.',
    'Every site package includes custom design, motion, 2 languages, SEO basics, and copy (yours or ours).',
    'You start with a short brief on the site. We reply in writing. Calls only if you want them.',
    'At the end you get the git repo on your hosting, plus 2 weeks of launch support. Longer care is $350/mo.',
  ],
}

export const studioWhy = {
  headline: 'Why people pick us',
  items: [
    {
      id: 'custom-price',
      title: 'Looks custom. Priced simply.',
      body: 'You get a designed site in real code (React / Next / TypeScript) — without agency theatre prices or a fragile one-person Telegram chat.',
    },
    {
      id: 'async',
      title: 'Written-first, not Zoom-first',
      body: 'Brief on the site → scope in writing → feedback on the revisions board. A call is optional, never mandatory.',
    },
    {
      id: 'one-team',
      title: 'Site and bot from one place',
      body: 'Need a storefront and a Telegram / SMS / widget bot? Same studio, one handoff, one story.',
    },
    {
      id: 'no-ghost',
      title: 'Support has a name',
      body: 'Two weeks after launch are included. After that, Support our project ($350/mo) — small fixes in writing, no ghosting.',
    },
  ],
}

export const studioPains: PainPoint[] = [
  {
    id: 'agency',
    title: 'Agencies feel too heavy',
    body: 'You need a sharp site, not a long branding process. We keep packages fixed and easy to compare.',
  },
  {
    id: 'freelance',
    title: 'Freelancers feel risky',
    body: 'You see a staging link early, approve scope in writing, and get the full git repo at the end.',
  },
  {
    id: 'template',
    title: 'Templates look the same',
    body: 'No WordPress / Webflow skins. Custom layout and motion — still in a readable budget.',
  },
  {
    id: 'support',
    title: 'Nobody answers after launch',
    body: 'Launch support is included. Ongoing care is a clear monthly package — you always know what you buy.',
  },
]

export const studioFeatures: StudioFeature[] = [
  {
    id: 'custom-builds',
    title: 'We don’t do templates',
    description:
      'Every site is designed for your brand — from your references or from scratch, same price. Motion, 2 languages, and SEO basics are in the base. No WordPress reskins.',
    className: 'md:col-span-4 md:row-span-2',
    variant: 'hero',
  },
  {
    id: 'landing-price',
    title: 'Landings from $400',
    description:
      'Then from $500 / $1,000 / $2,000 as the site grows. Add-ons (CRM, Stripe, extra language, booking) stay separate and clear.',
    className: 'md:col-span-2',
    variant: 'stat',
    stat: '$400+',
    statLabel: 'landing starting point',
  },
  {
    id: 'full-stack',
    title: 'Modern stack, chosen for the job',
    description:
      'React, Next.js, TypeScript, Tailwind — plus Python or a database when the product needs it.',
    className: 'md:col-span-2',
    variant: 'stack',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Python', 'PostgreSQL'],
  },
  {
    id: 'speed',
    title: 'Clear scope = clear speed',
    description: 'Landing: about 1–2 weeks. Bigger site or store: about 2–4 weeks. Web app: about 1–2 months.',
    className: 'md:col-span-2',
    variant: 'tint-cyan',
  },
  {
    id: 'bots',
    title: 'Bots in the same price band',
    description:
      'Starter $400 · Ops from $500 · AI from $1,000. You pay AI tokens on your own key — we don’t hide that in the fee.',
    className: 'md:col-span-2',
    variant: 'tint-pink',
  },
  {
    id: 'async-ops',
    title: 'Feedback lives on the site',
    description:
      'Brief to start. Revisions board for changes while we build. No hunting through old chat threads.',
    className: 'md:col-span-2',
    variant: 'tint-neutral',
  },
  {
    id: 'handoff',
    title: 'You own the code',
    description:
      'Default handoff: git repo + deploy to your hosting + a short how-to. We can host for a short bridge, then move it over.',
    className: 'md:col-span-3',
    variant: 'wide',
  },
  {
    id: 'support',
    title: 'Support our project',
    description:
      'Two weeks after launch included. Then $350/mo for written fixes and content tweaks via the revisions board.',
    className: 'md:col-span-3',
    variant: 'cta',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Short brief on the site',
    timing: 'Day 0',
    description:
      'Tell us what you need, budget band, and how to reach you. We reply in writing with a package fit — no required intro call.',
  },
  {
    id: '02',
    title: 'Agree the package',
    timing: '1–2 days',
    description:
      'We confirm price, timeline, and what “done” means. You approve in writing before we start building.',
  },
  {
    id: '03',
    title: 'Build + staging link',
    timing: '1–4 weeks',
    description:
      'You get a preview URL early. Send changes on /revisions — one clear note at a time.',
  },
  {
    id: '04',
    title: 'Launch & handoff',
    timing: 'Ship',
    description:
      'We deploy to your hosting, hand over git, leave a short runbook. Two weeks of support, then optional monthly care.',
  },
]

/** @deprecated */
export const manifesto = {
  label: studioIntro.eyebrow,
  headline: studioIntro.headline,
  paragraphs: [studioIntro.lead, ...studioIntro.points],
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
