import { dictionary } from "@/lib/i18n/dictionary";
import { servicesByLanguage } from "@/lib/i18n/services";
import type { ServiceItemId } from "@/lib/project-packages";
import type { ProjectId } from "@/lib/types";
import type { BriefAnswers, BriefRecommendation } from "./types";

const BASE_MATCH: Record<
  NonNullable<BriefAnswers["projectType"]>,
  { projectId: ProjectId; serviceItemId: ServiceItemId; rationale: string }
> = {
  landing: {
    projectId: "neuro-academy",
    serviceItemId: "landing-page",
    rationale:
      "A conversion-focused landing with clear offer structure — ideal when you need one strong page to sell or collect leads.",
  },
  multipage: {
    projectId: "aura-hair",
    serviceItemId: "multi-page-site",
    rationale:
      "A structured multi-page site with navigation, content sections, and room to grow as your business expands.",
  },
  ecommerce: {
    projectId: "jewelry-store",
    serviceItemId: "ecommerce-store",
    rationale:
      "A custom storefront with catalog, cart, and payments — boutique feel without template limitations.",
  },
  "telegram-bot": {
    projectId: "neuro-shpora",
    serviceItemId: "telegram-bot",
    rationale:
      "A production Telegram agent with dialog flows, LLM integration, and session memory — built where your users already are.",
  },
  "ai-product": {
    projectId: "petcare-ai",
    serviceItemId: "ai-core-mvp",
    rationale:
      "A fullstack product with real AI inside — auth, backend, and a functional dashboard, not just a marketing shell.",
  },
  "web-design": {
    projectId: "aura-hair",
    serviceItemId: "aesthetic-web",
    rationale:
      "Design-forward web experience with premium typography, motion, and brand-first storytelling.",
  },
};

const INDUSTRY_OVERRIDES: Partial<
  Record<NonNullable<BriefAnswers["industry"]>, Partial<typeof BASE_MATCH>>
> = {
  beauty: {
    landing: {
      projectId: "aura-hair",
      serviceItemId: "aesthetic-web",
      rationale:
        "Premium beauty brands need editorial layout, booking flow, and luxury aesthetics — like our AURA Hair Space case.",
    },
    "web-design": {
      projectId: "aura-hair",
      serviceItemId: "aesthetic-web",
      rationale:
        "Salon and wellness brands benefit from tactile visuals, service menus, and seamless booking UX.",
    },
  },
  edtech: {
    landing: {
      projectId: "neuro-academy",
      serviceItemId: "landing-page",
      rationale:
        "EdTech landing pages need strong visual identity and a clear path to enrollment or lead capture.",
    },
    "telegram-bot": {
      projectId: "neuro-shpora",
      serviceItemId: "telegram-bot",
      rationale:
        "Learning products often live in Telegram — our NeuroShpora bot shows agentic tutoring with memory and streaming.",
    },
  },
  ecommerce: {
    ecommerce: {
      projectId: "blessed-angel",
      serviceItemId: "ecommerce-store",
      rationale:
        "Premium e-commerce with interactive product presentation and conversion-focused UX — see Blessed Angel.",
    },
    "web-design": {
      projectId: "jewelry-store",
      serviceItemId: "aesthetic-web",
      rationale:
        "Luxury commerce needs typography, micro-interactions, and material feel — our Jellybead boutique is a strong reference.",
    },
  },
  b2b: {
    "ai-product": {
      projectId: "petcare-ai",
      serviceItemId: "web-app",
      rationale:
        "B2B teams often need dashboards, auth, and backend logic — a web app package fits before heavy AI scope.",
    },
  },
};

function applyBudget(
  match: { projectId: ProjectId; serviceItemId: ServiceItemId; rationale: string },
  budget: BriefAnswers["budget"],
  projectType: NonNullable<BriefAnswers["projectType"]>,
): { projectId: ProjectId; serviceItemId: ServiceItemId; rationale: string } {
  if (!budget) return match;

  if (budget === "under-3k") {
    if (projectType === "landing" || projectType === "web-design") {
      return {
        projectId: match.projectId,
        serviceItemId: "hero",
        rationale:
          "Start with a high-converting hero section — premium design and production code in days, then expand when ready.",
      };
    }
    if (projectType === "ai-product" || projectType === "telegram-bot") {
      return {
        projectId: match.projectId,
        serviceItemId: "audit",
        rationale:
          "An AI automation audit is the fastest way to map architecture, stack, and scope before a full build.",
      };
    }
  }

  if (budget === "12k-plus" && (projectType === "ai-product" || projectType === "multipage")) {
    return {
      projectId: "petcare-ai",
      serviceItemId: "neo-venture",
      rationale:
        "For complex launches — strategy, premium design, fullstack engineering, and post-launch support in one flagship package.",
    };
  }

  if (budget === "6k-12k" && projectType === "multipage") {
    return {
      projectId: "aura-hair",
      serviceItemId: "aesthetic-web",
      rationale:
        "A design-forward multi-section experience with motion and investor-ready polish — ideal for launches in the $6k range.",
    };
  }

  return match;
}

export function getBriefRecommendation(answers: BriefAnswers): BriefRecommendation | null {
  if (!answers.projectType) return null;

  const industryOverride = answers.industry
    ? INDUSTRY_OVERRIDES[answers.industry]?.[answers.projectType]
    : undefined;

  const base = industryOverride ?? BASE_MATCH[answers.projectType];
  const adjusted = applyBudget(base, answers.budget, answers.projectType);

  return {
    projectId: adjusted.projectId,
    serviceItemId: adjusted.serviceItemId,
    rationale: adjusted.rationale,
  };
}

export function getServiceItemById(itemId: ServiceItemId) {
  for (const tier of servicesByLanguage.en.tiers) {
    const item = tier.items.find((entry) => entry.id === itemId);
    if (item) return item;
  }
  return null;
}

export function buildTelegramBriefMessage(answers: BriefAnswers): string {
  const recommendation = getBriefRecommendation(answers);
  const project = recommendation
    ? dictionary.en.projects[recommendation.projectId]
    : null;
  const service = recommendation
    ? getServiceItemById(recommendation.serviceItemId)
    : null;

  const lines = [
    "Hi Neo Studio Space — project brief:",
    "",
    answers.projectType
      ? `Need: ${answers.projectType.replace(/-/g, " ")}`
      : null,
    answers.industry ? `Industry: ${answers.industry}` : null,
    answers.budget ? `Budget: ${answers.budget.replace(/-/g, " ")}` : null,
    answers.timeline ? `Timeline: ${answers.timeline.replace(/-/g, " ")}` : null,
    project ? `Matched case: ${project.title}` : null,
    service ? `Suggested package: ${service.name} (${service.price})` : null,
    answers.notes.trim() ? `Notes: ${answers.notes.trim()}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildTelegramUrl(message: string): string {
  return `https://t.me/neostudio_space?text=${encodeURIComponent(message)}`;
}
