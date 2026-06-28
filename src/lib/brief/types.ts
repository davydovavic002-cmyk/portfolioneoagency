import type { ServiceItemId } from "@/lib/project-packages";
import type { ProjectId } from "@/lib/types";

export type BriefProjectType =
  | "landing"
  | "multipage"
  | "ecommerce"
  | "telegram-bot"
  | "ai-product"
  | "web-design";

export type BriefIndustry =
  | "startup"
  | "beauty"
  | "edtech"
  | "ecommerce"
  | "b2b"
  | "other";

export type BriefBudget = "under-3k" | "3k-6k" | "6k-12k" | "12k-plus";

export type BriefTimeline = "asap" | "2-4-weeks" | "flexible";

export interface BriefAnswers {
  projectType: BriefProjectType | null;
  industry: BriefIndustry | null;
  budget: BriefBudget | null;
  timeline: BriefTimeline | null;
  notes: string;
}

export interface BriefRecommendation {
  projectId: ProjectId;
  serviceItemId: ServiceItemId;
  rationale: string;
}

export const INITIAL_BRIEF_ANSWERS: BriefAnswers = {
  projectType: null,
  industry: null,
  budget: null,
  timeline: null,
  notes: "",
};
