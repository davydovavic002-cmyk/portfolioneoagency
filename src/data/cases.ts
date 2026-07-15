export type CasePillar = 'design' | 'fullstack' | 'ai'

export interface CasePillarMeta {
  id: CasePillar
  label: string
  subtitle: string
}

export const CASE_PILLARS: CasePillarMeta[] = [
  {
    id: 'design',
    label: 'Design',
    subtitle: 'Interfaces, branding, design systems',
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    subtitle: 'Web apps, APIs, and infrastructure',
  },
  {
    id: 'ai',
    label: 'AI & Bots',
    subtitle: 'Agents, RAG pipelines, automation',
  },
]

export interface CaseStudy {
  id: string
  title: string
  pillar: CasePillar
  tagline: string
  description: string
  year: string
  client: string
  duration: string
  team: string
  stack: string[]
  previewUrl: string
  coverImage: string
  relatedPackageId?: string
  overview: string
  challenge: string
  approach: { title: string; body: string }[]
  outcomes: string[]
}

export const cases: CaseStudy[] = [
  {
    id: 'stretch-and-chill',
    title: 'Stretch and Chill',
    pillar: 'design',
    tagline: 'Premium pilates studio site for Belgrade — dreamy aesthetics, magnetic interactions, notebook-style schedule.',
    description:
      'Two-page React SPA with glassmorphism, class slider, team cards, and a tactile schedule page.',
    year: '2026',
    client: 'Stretch and Chill · Belgrade',
    duration: '8–12 days',
    team: 'NEO Studio SPACE',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    previewUrl: 'https://pilates.neostudio.space/',
    coverImage: '/cases/stretch-and-chill.webp',
    relatedPackageId: 'landing-page',
    overview:
      'Stretch and Chill needed a brand-first web presence that feels dreamy and tactile — not a generic fitness template. We shipped a compact two-page experience: a magnetic home page and a notebook-style schedule view.',
    challenge:
      'A pilates studio in Belgrade needed a brand-first site that feels dreamy and tactile — not a generic fitness template.',
    approach: [
      {
        title: 'Visual language & motion',
        body: 'Glassmorphism panels, soft gradients, and magnetic button interactions that match the in-studio atmosphere.',
      },
      {
        title: 'Home experience',
        body: 'Class slider, team cards, and editorial typography — everything in one scroll with clear CTAs to book.',
      },
      {
        title: 'Schedule page',
        body: 'Notebook-style weekly layout for classes — readable on mobile, easy for the studio to point clients to.',
      },
      {
        title: 'Deploy & handoff',
        body: 'Essential Site package scope: React build on neostudio staging, performance pass, and deploy to production URL.',
      },
    ],
    outcomes: [
      'Live at pilates.neostudio.space with 2-page Essential Site scope',
      'Magnetic micro-interactions and motion-led brand feel',
      '8–12 day package timeline from brief to deploy',
    ],
  },
  {
    id: 'aura-hair',
    title: 'AURA Hair Space',
    pillar: 'design',
    tagline: 'Premium Singapore salon — stylist discovery, service menu, diagnostics, and online booking.',
    description:
      'Single-page editorial salon site with multi-step booking and dark-mode luxury aesthetic.',
    year: '2026',
    client: 'AURA Hair · Singapore',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'TypeScript'],
    previewUrl: 'https://aura.neostudio.space/',
    coverImage: '/cases/aura-hair.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium salon needed a digital presence that matches the in-chair experience — not a generic booking widget. We built a single-page editorial site with stylist profiles, service menu, hair diagnostics, and a four-step booking flow.',
    challenge:
      'A premium salon needed a digital presence that matches in-chair experience — not a generic booking widget.',
    approach: [
      {
        title: 'Editorial single-page layout',
        body: 'Dark-mode luxury aesthetic with strong typography and photography-led sections.',
      },
      {
        title: 'Multi-step booking',
        body: 'Four-step flow: stylist selection, services, diagnostics questionnaire, and confirmation.',
      },
      {
        title: 'Service & stylist discovery',
        body: 'Structured menu of treatments and individual stylist profiles with clear pricing cues.',
      },
      {
        title: 'Aesthetic Web delivery',
        body: 'Up to 5 pages worth of content on a cohesive one-page architecture — motion, SEO, and deploy included.',
      },
    ],
    outcomes: [
      '4-step booking flow on a single editorial page',
      'Dark mode theme support throughout',
      'Aesthetic Web package · 10–14 day timeline',
    ],
  },
  {
    id: 'jewelry-store',
    title: 'Jellybead',
    pillar: 'fullstack',
    tagline: 'Luxury jewelry boutique — typography-led storefront with Stripe and CMS catalog.',
    description:
      'Custom Next.js boutique with motion-led product storytelling and live checkout.',
    year: '2026',
    client: 'Jellybead',
    duration: '14–18 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Stripe', 'Sanity CMS'],
    previewUrl: 'https://jelly.neostudio.space/',
    coverImage: '/cases/jewelry-store.webp',
    relatedPackageId: 'ecommerce-store',
    overview:
      'Jellybead needed a luxury storefront that feels bespoke — not a template — with reliable checkout. We delivered a custom Next.js boutique emphasizing typography, micro-interactions, and tactile material perception through the interface.',
    challenge:
      'Launch a luxury storefront that feels bespoke — not a template — with reliable checkout.',
    approach: [
      {
        title: 'Boutique UI & motion',
        body: 'Product pages with micro-interactions and editorial layout — premium feel without clutter.',
      },
      {
        title: 'Commerce stack',
        body: 'Stripe checkout, cart flow, and CMS-driven catalog so the team can update products without deploys.',
      },
      {
        title: 'Content architecture',
        body: 'Sanity CMS for categories, product metadata, and campaign-ready landing sections.',
      },
      {
        title: 'E-commerce Store package',
        body: 'Full store scope: design, implementation, order flow, responsive polish, and production deploy.',
      },
    ],
    outcomes: [
      'Stripe live payments on custom storefront',
      'CMS-managed product catalog',
      'E-commerce Store package · 14–18 day timeline',
    ],
  },
  {
    id: 'petcare-ai',
    title: 'PetCare AI',
    pillar: 'ai',
    tagline: 'Vet clinic ecosystem — diagnostic AI, feed analysis, and clinic-facing dashboard.',
    description:
      'Demo-ready AI product with clinic workflows, nutrition plans, and a functional dashboard UI.',
    year: '2025',
    client: 'PetCare AI',
    duration: '14–21 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    previewUrl: 'https://petcare.neostudio.space/',
    coverImage: '/cases/petcare-ai.webp',
    relatedPackageId: 'ai-core-mvp',
    overview:
      'Vet clinics needed a demo-ready AI product without rebuilding their entire stack. We scoped an MVP with diagnostic AI, feed composition analysis, personalized nutrition plans, and a clinic-facing dashboard.',
    challenge:
      'Vet clinics needed a demo-ready AI product without rebuilding their entire stack.',
    approach: [
      {
        title: 'AI diagnostic module',
        body: 'LLM-powered intake and analysis flows designed for clinic demos and partner presentations.',
      },
      {
        title: 'Feed & nutrition engine',
        body: 'Composition analysis and personalized plan generation tied to pet profiles.',
      },
      {
        title: 'Clinic dashboard',
        body: 'Authenticated UI for three core clinic workflows — built for clarity, not enterprise bloat.',
      },
      {
        title: 'AI Core MVP delivery',
        body: 'Fullstack with Supabase/FastAPI backend, auth, Stripe-ready architecture, and production deploy.',
      },
    ],
    outcomes: [
      '3 clinic workflows in a shippable MVP',
      'AI Core MVP package · 14–21 day timeline',
      'Live demo environment at petcare.neostudio.space',
    ],
  },
  {
    id: 'blessed-angel',
    title: 'Blessed Angel',
    pillar: 'design',
    tagline: 'Premium accessory configurator — 3D-inspired UX, brand visuals, checkout-ready flows.',
    description:
      'Interactive configurator with Framer Motion and Three.js — not a static catalog.',
    year: '2024',
    client: 'Blessed Angel',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'Three.js'],
    previewUrl: 'https://blessedangel.store',
    coverImage: '/cases/blessed-angel.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium accessories brand needed an interactive experience, not a static catalog. We delivered a 3D-inspired configurator with Framer Motion, brand-led visuals, and flows ready for checkout integration.',
    challenge:
      'Premium accessories brand needed an interactive experience, not a static catalog.',
    approach: [
      {
        title: 'Configurator UX',
        body: '3D-inspired product customization with real-time visual feedback and premium segment positioning.',
      },
      {
        title: 'Brand motion system',
        body: 'Framer Motion throughout — transitions that feel tactile and high-end.',
      },
      {
        title: 'Three.js visual layer',
        body: 'WebGL accents for product presentation without sacrificing performance on mobile.',
      },
      {
        title: 'Aesthetic Web scope',
        body: 'Custom design, Next.js frontend, responsive polish, and deploy to blessedangel.store.',
      },
    ],
    outcomes: [
      'Interactive configurator live on blessedangel.store',
      '3D-inspired UX on Aesthetic Web package',
      '10–14 day timeline from scope to launch',
    ],
  },
]

export function getCaseById(id: string): CaseStudy | undefined {
  return cases.find((c) => c.id === id)
}

export function getCasesByPillar(pillar: CasePillar): CaseStudy[] {
  return cases.filter((c) => c.pillar === pillar)
}
