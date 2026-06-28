import type {
  BriefBudget,
  BriefIndustry,
  BriefProjectType,
  BriefTimeline,
} from "./types";

export const briefCopy = {
  title: "Project brief",
  subtitle: "Answer a few questions — we'll match you with a relevant case study and package.",
  step: (current: number, total: number) => `Step ${current} of ${total}`,
  back: "Back",
  next: "Continue",
  finish: "See recommendation",
  close: "Close",
  notesPlaceholder: "Current site URL, references, or anything else we should know (optional)",
  notesLabel: "Anything else?",
  timelineLabel: "Timeline",
  resultTitle: "Your match",
  resultSubtitle: "Based on your answers — a live case study and a fixed-scope package.",
  caseStudy: "Relevant case study",
  recommendedPackage: "Recommended package",
  sendBrief: "Send brief on Telegram",
  restart: "Start over",
  projectType: {
    label: "What do you need?",
    options: {
      landing: {
        label: "Landing page",
        description: "One focused page to sell, pitch, or collect leads.",
      },
      multipage: {
        label: "Multi-page website",
        description: "Company site with services, about, contacts, and room to grow.",
      },
      ecommerce: {
        label: "Online store",
        description: "Catalog, cart, and checkout — custom UI, not a template.",
      },
      "telegram-bot": {
        label: "Telegram AI bot",
        description: "An agent where your users already are — support, EdTech, or SaaS.",
      },
      "ai-product": {
        label: "AI-powered product",
        description: "Web app or platform with real AI inside — not just marketing.",
      },
      "web-design": {
        label: "Premium web design",
        description: "Brand-first experience with motion, typography, and polish.",
      },
    } satisfies Record<BriefProjectType, { label: string; description: string }>,
  },
  industry: {
    label: "Who is it for?",
    options: {
      startup: { label: "Startup / founder", description: "Launch, pitch, or first product." },
      beauty: { label: "Beauty & wellness", description: "Salon, spa, or personal brand." },
      edtech: { label: "Education / EdTech", description: "Courses, academies, learning products." },
      ecommerce: { label: "E-commerce brand", description: "Physical or digital products." },
      b2b: { label: "B2B / SaaS", description: "Tools, dashboards, or client portals." },
      other: { label: "Other", description: "We'll tailor the scope in conversation." },
    } satisfies Record<BriefIndustry, { label: string; description: string }>,
  },
  budget: {
    label: "What's your budget range?",
    options: {
      "under-3k": { label: "Under $3,000", description: "Focused scope or a strong starting point." },
      "3k-6k": { label: "$3,000 – $6,000", description: "Full landing, store, or bot build." },
      "6k-12k": { label: "$6,000 – $12,000", description: "AI product or larger web experience." },
      "12k-plus": { label: "$12,000+", description: "Flagship product or multi-module launch." },
    } satisfies Record<BriefBudget, { label: string; description: string }>,
  },
  timeline: {
    label: "When do you need it?",
    options: {
      asap: { label: "ASAP", description: "Ready to start within days." },
      "2-4-weeks": { label: "2–4 weeks", description: "Standard production timeline." },
      flexible: { label: "Flexible", description: "Quality over speed — we'll plan together." },
    } satisfies Record<BriefTimeline, { label: string; description: string }>,
  },
} as const;
