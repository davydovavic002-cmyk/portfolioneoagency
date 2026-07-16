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
  headline: 'Custom sites. Template prices. No Zoom required.',
  lead:
    'NEO STUDIO SPACE is a remote full-stack studio (Europe / Asia timezone). We ship real websites and bots — custom design, motion, multilingual, SEO — without WordPress skins or no-code shortcuts. Est. 2021.',
  points: [
    'Landing pages from $400 — custom code, not a theme with your logo glued on.',
    'Base scope includes animations, multilingual, and SEO. CRM, payments, and heavier product work are clear upsells.',
    'Written-first process: brief on site, scope in writing, revisions in writing. Calls optional, not mandatory.',
    'You get the git repo + deploy to your hosting. Two weeks of launch support included; ongoing care is a separate package.',
  ],
}

/** Differentiation — A + D + studio-added angles */
export const studioWhy = {
  headline: 'Why not another template shop or freelancer roulette',
  items: [
    {
      id: 'custom-price',
      title: 'Custom at template money',
      body: 'Agencies charge boutique rates for bespoke builds. Freelancers disappear. We aim for template-range pricing with real engineering — React / Next / TypeScript under the hood.',
    },
    {
      id: 'async',
      title: 'Async by default',
      body: 'No calendar Tetris. Start with the site brief, approve scope in writing, leave feedback in writing. Zoom only if you want it.',
    },
    {
      id: 'one-team',
      title: 'Sites + bots, one studio',
      body: 'Same team for the storefront and the SMS / Discord / Slack agent beside it — one stack story, one handoff.',
    },
    {
      id: 'no-ghost',
      title: 'Still here after launch',
      body: 'Two weeks of basic support in the build. After that, Support our project ($350/mo) — written fixes, not ghosting.',
    },
  ],
}

export const studioPains: PainPoint[] = [
  {
    id: 'agency',
    title: 'Agencies feel expensive',
    body: 'You need a sharp site, not a six-figure branding theatre. We keep scope tight and prices closer to template land.',
  },
  {
    id: 'freelance',
    title: 'Freelancers feel risky',
    body: 'Written milestones, staging URLs, git handoff. You’re not betting the brand on one silent Telegram chat.',
  },
  {
    id: 'template',
    title: 'Templates look cheap',
    body: 'We don’t do WordPress / Webflow skins. Custom UI, motion, and SEO — still readable budgets.',
  },
  {
    id: 'support',
    title: 'Support vanishes after launch',
    body: 'Launch window included. Ongoing care is a named package — you always know what you’re buying.',
  },
]

export const studioFeatures: StudioFeature[] = [
  {
    id: 'custom-builds',
    title: 'We don’t do templates',
    description:
      'Full sites for any project — custom layout, animations, multilingual, SEO in the base. No WordPress reskins, no no-code clones. Safe, reliable, always reachable in writing.',
    className: 'md:col-span-4 md:row-span-2',
    variant: 'hero',
  },
  {
    id: 'landing-price',
    title: 'Landings from $400',
    description:
      'Fixed packages for clear scopes. Upsells (CRM, payments, deeper product) stay explicit — no mystery line items.',
    className: 'md:col-span-2',
    variant: 'stat',
    stat: '$400+',
    statLabel: 'landing baseline',
  },
  {
    id: 'full-stack',
    title: 'Stack follows the product',
    description:
      'React, Next.js, TypeScript, Tailwind, Python when the backend needs it — chosen for the job, not for our comfort.',
    className: 'md:col-span-2',
    variant: 'stack',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Python', 'PostgreSQL'],
  },
  {
    id: 'speed',
    title: 'Fast when scope is clear',
    description: 'Typical landing: 1–2 weeks. With CRM / product upsells: about 2–4 weeks.',
    className: 'md:col-span-2',
    variant: 'tint-cyan',
  },
  {
    id: 'bots',
    title: 'Bots & agents too',
    description:
      'SMS, Slack, Discord, RAG — same studio as the website, so the product and the agent don’t fight each other.',
    className: 'md:col-span-2',
    variant: 'tint-pink',
  },
  {
    id: 'async-ops',
    title: 'Feedback stays on the site',
    description:
      'Brief starts here. Revisions go to the written board on neostudio.space/revisions — not scattered call notes.',
    className: 'md:col-span-2',
    variant: 'tint-neutral',
  },
  {
    id: 'handoff',
    title: 'Repo + your hosting',
    description:
      'Default handoff: full git access, deploy to your infrastructure, short runbook. We can host temporarily if you need a bridge — then we migrate.',
    className: 'md:col-span-3',
    variant: 'wide',
  },
  {
    id: 'support',
    title: 'Support our project',
    description:
      'Two weeks of launch support included. After that — $350/mo written care (fixes, content, priority reply). No ghosting, no vague retainers.',
    className: 'md:col-span-3',
    variant: 'cta',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Brief on the site',
    timing: 'Day 0',
    description:
      'Fill the brief: goals, refs, budget, contacts, access. We reply in writing with a package match and questions — no mandatory intro call.',
  },
  {
    id: '02',
    title: 'Written scope & kickoff',
    timing: '1–2 days',
    description:
      'Fixed package (or clear upsell list), timeline, and what “done” means. You approve in writing before build starts.',
  },
  {
    id: '03',
    title: 'Build + revisions board',
    timing: '1–4 weeks',
    description:
      'Staging URL early. Feedback goes to /revisions — one written note at a time. We iterate without calendar chaos.',
  },
  {
    id: '04',
    title: 'Launch & handoff',
    timing: 'Ship',
    description:
      'Deploy to your hosting, git repo transfer, short runbook. Two weeks of basic support, then optional Support our project.',
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
