import type { Language, ProjectId, ServiceTierId } from "@/lib/types";
import { servicesByLanguage, type ServiceItem } from "@/lib/i18n/services";

export type ServiceItemId =
  | "aesthetic-micro"
  | "hero"
  | "landing-page"
  | "aesthetic-web"
  | "multi-page-site"
  | "telegram-bot"
  | "web-app"
  | "ecommerce-store"
  | "ai-core-mvp"
  | "neo-venture"
  | "neo-dedicated";

export const PROJECT_PACKAGE_MAP: Record<ProjectId, ServiceItemId> = {
  "aura-hair": "aesthetic-web",
  "jewelry-store": "ecommerce-store",
  "petcare-ai": "ai-core-mvp",
  "stretch-and-chill": "aesthetic-web",
  "neuro-shpora": "telegram-bot",
  "blessed-angel": "aesthetic-web",
};

export interface ProjectPackageRef {
  item: ServiceItem;
  tierId: ServiceTierId;
  itemId: ServiceItemId;
}

export function getProjectPackage(
  projectId: ProjectId,
  language: Language,
): ProjectPackageRef | null {
  const itemId = PROJECT_PACKAGE_MAP[projectId];
  const services = servicesByLanguage[language];

  for (const tier of services.tiers) {
    const item = tier.items.find((entry) => entry.id === itemId);
    if (item) {
      return { item, tierId: tier.id, itemId };
    }
  }

  return null;
}

export function serviceItemElementId(itemId: string): string {
  return `service-${itemId}`;
}
