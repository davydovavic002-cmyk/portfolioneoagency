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
  headline: 'We build software the way you\'d want your own team to build it.',
  lead:
    'NEO STUDIO SPACE is a full-stack design-engineering studio. We take on fewer projects so each one gets a custom architecture, a real staging environment, and a team that stays on it from first call to handoff.',
  points: [
    'Every stack is chosen for your product — not pulled from a template library.',
    'You get staging URLs early, written docs at the end, and full ownership of the code.',
    'We work in English with international B2B clients; async-friendly, timezone-flexible.',
  ],
}

export const studioFeatures: StudioFeature[] = [
  {
    id: 'custom-builds',
    title: 'Built from scratch',
    description:
      'Web apps, admin panels, APIs, and AI layers scoped around your business logic. No WordPress reskins, no white-label SaaS with your logo pasted on.',
    className: 'md:col-span-4 md:row-span-2',
    variant: 'hero',
  },
  {
    id: 'prototype-48h',
    title: 'Prototype in 48 hours',
    description:
      'Clickable core flow or early bot draft on a staging URL — before you commit to a long contract.',
    className: 'md:col-span-2',
    variant: 'stat',
    stat: '48h',
    statLabel: 'to first staging URL',
  },
  {
    id: 'full-stack',
    title: 'Full-stack, one team',
    description:
      'Design and engineering in one loop — nothing lost between Figma and production.',
    className: 'md:col-span-2',
    variant: 'stack',
    tags: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'Stripe', 'CI/CD'],
  },
  {
    id: 'ai',
    title: 'AI that stays useful',
    description: 'RAG, bots, doc search — with citations and data boundaries you control.',
    className: 'md:col-span-2',
    variant: 'tint-cyan',
  },
  {
    id: 'edtech',
    title: 'EdTech & LMS',
    description: 'Courses, enrollment, payments — replacing spreadsheet chaos.',
    className: 'md:col-span-2',
    variant: 'tint-pink',
  },
  {
    id: 'design',
    title: 'Design systems',
    description: 'Tokens and components in Figma and code — consistent at launch and after.',
    className: 'md:col-span-2',
    variant: 'tint-neutral',
  },
  {
    id: 'handoff',
    title: 'Handoff you can actually use',
    description:
      'Typed API specs, runbooks, repo access. Your team runs it without us on speed dial.',
    className: 'md:col-span-3',
    variant: 'wide',
  },
  {
    id: 'transparent',
    title: 'Clear contracts & full IP',
    description:
      'Open MSA, milestone billing, you own the code on payment. Details in the legal section below.',
    className: 'md:col-span-3',
    variant: 'cta',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Intro & scope',
    timing: 'Week 0',
    description:
      'We learn your workflow, constraints, and what "done" looks like. You get a written scope and stack recommendation — no mystery line items.',
  },
  {
    id: '02',
    title: 'Staging prototype',
    timing: '48 hours',
    description:
      'Core user flow or bot draft on a real URL. You click through it, share it internally, and we adjust before heavy backend work starts.',
  },
  {
    id: '03',
    title: 'Build sprints',
    timing: 'Bi-weekly',
    description:
      'Two-week cycles with demos at the end of each. You see working software, release notes, and a clear list of what\'s next.',
  },
  {
    id: '04',
    title: 'Launch & docs',
    timing: 'Ship',
    description:
      'Production deploy, monitoring basics, and documentation your team can follow. Optional support window if you want us on standby after go-live.',
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
