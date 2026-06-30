import type { BriefProjectType } from "@/lib/brief/types";
import type { ProjectId } from "@/lib/types";
import type { ServiceItemId } from "@/lib/project-packages";

export type ServicePageSlug =
  | "web-design"
  | "landing-page"
  | "telegram-bot"
  | "ai-automation";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  slug: ServicePageSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string[];
  includesTitle: string;
  includes: string[];
  processTitle: string;
  process: { title: string; description: string }[];
  caseStudy: {
    projectId: ProjectId;
    title: string;
    summary: string;
    href: string;
  };
  package: {
    serviceItemId: ServiceItemId;
    name: string;
    price: string;
    timeline: string;
    summary: string;
  };
  faq: ServiceFaq[];
  briefProjectType: BriefProjectType;
  ctaTitle: string;
  ctaSubtitle: string;
}

export const SERVICE_PAGES: Record<ServicePageSlug, ServicePageContent> = {
  "web-design": {
    slug: "web-design",
    title: "Web Design Services",
    metaTitle: "Web Design Services — Custom UI & Brand-First Websites",
    metaDescription:
      "Hire a web designer for premium, conversion-focused interfaces. Neo Studio Space builds custom web design with Next.js, motion, and SEO — fixed price from $3,500.",
    keywords: [
      "web design",
      "web designer",
      "custom web design",
      "website design services",
      "UI design",
      "premium web design",
    ],
    heroEyebrow: "Neo Studio Space · Web Design",
    heroTitle: "Web design that feels inevitable — not templated.",
    heroSubtitle:
      "Brand-first interfaces with typography, motion, and production-ready code. Every project in our portfolio is a live product you can open today.",
    intro: [
      "Most businesses searching for a web designer want more than a pretty mockup. You need a site that loads fast, reads clearly on mobile, ranks in search, and turns visitors into leads or sales. That is the gap between template themes and custom product design.",
      "At Neo Studio Space we design and build in one workflow: UX structure, visual identity, Next.js implementation, and basic SEO baked in from day one. No handoff friction between a designer and a separate dev team.",
      "Our work spans beauty booking platforms, luxury e-commerce, EdTech landings, and AI products — always with the same standard: editorial layout, intentional whitespace, and micro-interactions that signal quality without slowing the page.",
    ],
    includesTitle: "What our web design package includes",
    includes: [
      "UX structure and visual design (up to 5 pages)",
      "Custom Next.js + Tailwind frontend — no page-builder lock-in",
      "Framer Motion micro-interactions and responsive polish",
      "Typography system, color tokens, and component library",
      "Basic on-page SEO: titles, meta, semantic markup, performance",
      "Deploy to production with a handoff you can maintain",
    ],
    processTitle: "How we work",
    process: [
      {
        title: "Discovery",
        description:
          "We clarify audience, offer, and references — then map page structure before pixels.",
      },
      {
        title: "Design",
        description:
          "High-fidelity screens with real copy placeholders, not lorem ipsum filler.",
      },
      {
        title: "Build",
        description:
          "Production code in Next.js with the same visual fidelity as the design file.",
      },
      {
        title: "Launch",
        description:
          "Performance pass, mobile QA, SEO basics, and a clear path for future pages.",
      },
    ],
    caseStudy: {
      projectId: "aura-hair",
      title: "AURA Hair Space",
      summary:
        "A premium Singapore salon site — editorial layout, stylist discovery, service menu, and online booking in a luxury aesthetic.",
      href: "https://aura.neostudio.space/",
    },
    package: {
      serviceItemId: "aesthetic-web",
      name: "Aesthetic Web",
      price: "$3,500",
      timeline: "10–14 days",
      summary:
        "Design-forward web experience for startups and brands preparing for launch — custom design, motion, and SEO basics.",
    },
    faq: [
      {
        question: "How much does custom web design cost?",
        answer:
          "Our Aesthetic Web package starts at $3,500 for a brand-first site (up to 5 pages) with design and Next.js build. Larger scopes — multi-page sites, stores, or AI products — are quoted as fixed packages on our pricing page.",
      },
      {
        question: "Do you only design, or also develop?",
        answer:
          "We do both. Every web design engagement includes production-ready frontend code — not mockups without implementation.",
      },
      {
        question: "Will my site work on mobile and rank in Google?",
        answer:
          "Yes — responsive layout, fast load, and basic SEO (semantic HTML, meta tags, performance) are included. For content-heavy SEO strategies we can extend scope in a retainer.",
      },
      {
        question: "How long does a web design project take?",
        answer:
          "Most Aesthetic Web projects ship in 10–14 days after kickoff. Timeline depends on content readiness and revision rounds — we keep both fixed in the proposal.",
      },
    ],
    briefProjectType: "web-design",
    ctaTitle: "Not sure which package fits?",
    ctaSubtitle: "Take the 2-minute brief — we will match a live case study and a fixed-scope estimate.",
  },
  "landing-page": {
    slug: "landing-page",
    title: "Essential Site Design & Development",
    metaTitle: "Essential Site — Up to 3 Pages from $2,500",
    metaDescription:
      "Compact site with navigation: up to 3 pages, UX, Next.js build, forms, and SEO. Neo Studio Space — fixed price, 8–12 day delivery.",
    keywords: [
      "landing page design",
      "landing page development",
      "high converting landing page",
      "landing page designer",
      "create landing page",
    ],
    heroEyebrow: "Neo Studio Space · Essential Sites",
    heroTitle: "Small sites with structure — not one endless scroll.",
    heroSubtitle:
      "Up to 3 pages with navigation: home, pricing, FAQ, schedule, or contact — forms wired in. Fixed scope, fixed price.",
    intro: [
      "When a single scroll is not enough, a compact multi-page site gives each topic its own URL — pricing, proof, schedule, or contact — without jumping to a full company website.",
      "We build Essential Sites around clear page flow: shared navigation, consistent layout, and production Next.js code that loads fast on mobile.",
      "Unlike page builders, you get ownable code, basic SEO, and a path to Aesthetic Web or Multi-page when you outgrow three pages.",
    ],
    includesTitle: "What's included in the Essential Site package",
    includes: [
      "UX structure and visual design for up to 3 pages",
      "Shared navigation, layout system, and page templates",
      "Next.js + Tailwind implementation with responsive layout",
      "Contact form or CTA integration (Telegram, email, Calendly, etc.)",
      "Basic SEO: meta tags, Open Graph, semantic sections",
      "Performance optimization, deploy, and handoff documentation",
    ],
    processTitle: "From brief to live URL",
    process: [
      {
        title: "Offer mapping",
        description:
          "We nail the single action you want — demo booking, waitlist, purchase, or contact.",
      },
      {
        title: "Wireframe → design",
        description:
          "Section flow first, then visual design with your brand or our art direction.",
      },
      {
        title: "Build & integrate",
        description:
          "Production page with forms, analytics hooks, and fast Lighthouse scores.",
      },
      {
        title: "Ship",
        description:
          "Domain connect, final QA, and a clear upgrade path to multi-page or product work.",
      },
    ],
    caseStudy: {
      projectId: "stretch-and-chill",
      title: "Stretch and Chill",
      summary:
        "Wellness studio SPA with home and schedule pages, magnetic interactions, and a notebook-style planner — built on the Essential Site package.",
      href: "https://pilates.neostudio.space/",
    },
    package: {
      serviceItemId: "landing-page",
      name: "Essential Site · up to 3 pages",
      price: "$2,500",
      timeline: "8–12 days",
      summary:
        "Up to 3 linked pages with navigation — for founders and brands that need separate home, pricing, schedule, or contact pages.",
    },
    faq: [
      {
        question: "How much does an Essential Site cost?",
        answer:
          "Our Essential Site package is $2,500 fixed — up to 3 pages, design, development, forms/CTAs, responsive layout, and basic SEO. No hourly surprises.",
      },
      {
        question: "How is this different from Aesthetic Micro-Site?",
        answer:
          "Micro-Site ($1,600) is one scrollable landing page with glass UI and motion. Essential Site ($2,500) gives you up to 3 separate pages with navigation — like Stretch and Chill (home + schedule).",
      },
      {
        question: "Can you redesign my existing site?",
        answer:
          "Yes. Share your current URL in the project brief and we will recommend Essential Site, Aesthetic Micro-Site ($1,600) for a one-page landing, or Hero Section ($1,200) if only the top fold needs work.",
      },
      {
        question: "Do you write copy?",
        answer:
          "We structure sections and placeholder copy around your offer. Final marketing copy can come from you or we can extend scope for copywriting support.",
      },
      {
        question: "What stack do you use?",
        answer:
          "Next.js, TypeScript, and Tailwind CSS — the same stack we use on client products so your page stays fast and maintainable.",
      },
    ],
    briefProjectType: "landing",
    ctaTitle: "Ready for an Essential Site estimate?",
    ctaSubtitle: "Answer four quick questions — get a matched case study and package on the spot.",
  },
  "telegram-bot": {
    slug: "telegram-bot",
    title: "Telegram Bot Development",
    metaTitle: "Telegram Bot Development — AI Agents & Automation",
    metaDescription:
      "Custom Telegram bot development with AI, dialog flows, and session memory. Production bots for EdTech, support, and SaaS — from $4,500.",
    keywords: [
      "telegram bot development",
      "telegram bot developer",
      "AI telegram bot",
      "chatbot development",
      "telegram automation",
    ],
    heroEyebrow: "Neo Studio Space · Telegram Bots",
    heroTitle: "Telegram bots that work like products — not toys.",
    heroSubtitle:
      "LLM agents, structured dialog flows, memory, and streaming — deployed where your users already chat every day.",
    intro: [
      "Telegram is underrated as a product surface. For education, community, support, and lightweight SaaS, it beats forcing users to install another app. The challenge is building bots that handle real conversations — context, errors, and scale — not one-off demo scripts.",
      "We design conversation architecture first: intents, fallbacks, onboarding, and handoff to humans when needed. Then we implement in Python (aiogram) or Node.js with OpenAI or other LLM providers, Redis or database session memory, and production deploy.",
      "Our NeuroShpora case study is a live example: agentic tutoring, subject flows, streaming responses, and UX patterns that feel native to Telegram — not a web form crammed into a chat window.",
    ],
    includesTitle: "Telegram AI Bot package includes",
    includes: [
      "Conversation design and bot architecture document",
      "Python (aiogram) or Node.js implementation",
      "OpenAI / LLM integration with streaming responses",
      "Redis or database session memory",
      "Admin or content hooks where needed",
      "Deploy, monitoring setup, docs, and handoff",
    ],
    processTitle: "Bot delivery process",
    process: [
      {
        title: "Flow design",
        description:
          "User journeys, commands, inline keyboards, and AI vs deterministic paths.",
      },
      {
        title: "Prototype",
        description:
          "Core dialog loop working in a staging bot before full feature breadth.",
      },
      {
        title: "Integrate AI",
        description:
          "Prompting, tools, memory, rate limits, and safe fallbacks.",
      },
      {
        title: "Production",
        description:
          "Hosting, logging, error alerts, and documentation for your team.",
      },
    ],
    caseStudy: {
      projectId: "neuro-shpora",
      title: "NeuroShpora",
      summary:
        "Agentic Telegram bot with contextual memory, code review, and streaming — built for real learning workflows.",
      href: "/",
    },
    package: {
      serviceItemId: "telegram-bot",
      name: "Telegram AI Bot",
      price: "$4,500",
      timeline: "10–14 days",
      summary:
        "Production-ready Telegram bot for EdTech, support, and SaaS teams that need an AI agent in the channel users already use.",
    },
    faq: [
      {
        question: "How much does Telegram bot development cost?",
        answer:
          "Our Telegram AI Bot package starts at $4,500 for a production bot with LLM integration, dialog design, memory, and deploy. Complex multi-agent systems may scope into AI Core MVP or Neo Venture.",
      },
      {
        question: "Which AI models do you support?",
        answer:
          "Primarily OpenAI APIs; we also integrate Anthropic, open models, and custom tool-calling pipelines depending on latency, cost, and privacy needs.",
      },
      {
        question: "Can the bot connect to our CRM or database?",
        answer:
          "Yes — webhooks, REST APIs, Supabase, PostgreSQL, and Google Sheets are common integrations we ship inside the fixed scope or as add-ons.",
      },
      {
        question: "Do you maintain the bot after launch?",
        answer:
          "We include deploy and handoff docs. Ongoing iteration is available through our Neo Dedicated retainer ($4,500/month).",
      },
    ],
    briefProjectType: "telegram-bot",
    ctaTitle: "Planning a Telegram bot?",
    ctaSubtitle: "Use the brief to get a case study match and a fixed-scope quote.",
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation & Product Engineering",
    metaTitle: "AI Automation Services — MVPs & Integration",
    metaDescription:
      "AI automation for business: LLM agents, Supabase backends, and AI product MVPs. Neo Studio Space — strategy to production.",
    keywords: [
      "AI automation",
      "AI development",
      "AI product development",
      "LLM integration",
      "AI consulting",
      "automate business with AI",
    ],
    heroEyebrow: "Neo Studio Space · AI Automation",
    heroTitle: "AI automation that ships — not slide decks.",
    heroSubtitle:
      "From a scoped MVP to a full AI product: we map your stack, build agents, and put them in production.",
    intro: [
      "Search traffic around AI automation is exploding — and so is noise. Teams want to know which workflows to automate, which models to use, and how to connect frontend, backend, and LLM APIs without security holes.",
      "We start practical: the brief helps us map workflows and stack choices (OpenAI, Supabase, n8n, custom agents), then we quote a fixed-scope package — AI Core MVP or Neo Venture. No open-ended consulting retainers required to get value.",
      "When you are ready to build, our AI Core MVP package delivers auth, database, dashboard UI, Stripe if needed, and real AI features — media generation, smart chat, or tool-using agents. PetCare AI in our portfolio is the reference: diagnostics, nutrition analysis, and a B2B-facing product surface.",
    ],
    includesTitle: "AI Core MVP — what you get",
    includes: [
      "Database and backend on Supabase, FastAPI, or PostgreSQL",
      "Custom AI tools via API — LLM agents, smart chat, media generation",
      "Authentication and user accounts",
      "Stripe payments when monetization is in scope",
      "Functional dashboard or product UI/UX",
      "Production deploy and technical handoff",
    ],
    processTitle: "AI project phases",
    process: [
      {
        title: "Scope & architecture",
        description:
          "Kickoff call and written scope — workflows, data, and model choices before code.",
      },
      {
        title: "MVP scope",
        description:
          "Fixed feature list: one AI capability done well beats five half-built demos.",
      },
      {
        title: "Fullstack build",
        description:
          "Backend, prompts, tools, UI, and observability in one team.",
      },
      {
        title: "Iterate",
        description:
          "Post-launch support or Neo Dedicated retainer for continuous improvement.",
      },
    ],
    caseStudy: {
      projectId: "petcare-ai",
      title: "PetCare AI",
      summary:
        "HealthTech platform for vet clinics — diagnostic AI module, feed analysis, and personalized nutrition plans in a production web app.",
      href: "https://petcare.neostudio.space/",
    },
    package: {
      serviceItemId: "ai-core-mvp",
      name: "AI Core MVP",
      price: "$6,000",
      timeline: "14–21 days",
      summary:
        "Fullstack build with AI integration, auth, and payments — for teams that need a working product with real AI inside.",
    },
    faq: [
      {
        question: "What is AI automation in practice?",
        answer:
          "It is replacing or augmenting manual workflows with LLM agents, scripted integrations, or custom tools — customer support triage, document processing, internal copilots, or product features powered by AI.",
      },
      {
        question: "Should I start small or go straight to MVP?",
        answer:
          "If you need a one-page landing first, Aesthetic Micro-Site / Landing Page ($1,600) ships in six days. If you have a defined product scope, AI Core MVP ($6,000) is the direct path to production.",
      },
      {
        question: "How do you handle data privacy?",
        answer:
          "We design around your constraints: API-only flows, regional hosting, PII minimization, and enterprise keys. Requirements are captured in discovery before implementation.",
      },
      {
        question: "Can you integrate AI into our existing app?",
        answer:
          "Yes — API design, embedding chat, or background agents in your current Next.js, mobile, or Telegram product are common engagement types.",
      },
    ],
    briefProjectType: "ai-product",
    ctaTitle: "Exploring AI for your product?",
    ctaSubtitle: "The brief takes two minutes — we will suggest an MVP or flagship path.",
  },
};

export const SERVICE_PAGE_SLUGS = Object.keys(SERVICE_PAGES) as ServicePageSlug[];

export function getServicePage(slug: string): ServicePageContent | null {
  if (slug in SERVICE_PAGES) {
    return SERVICE_PAGES[slug as ServicePageSlug];
  }
  return null;
}
