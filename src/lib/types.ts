export const DESKTOP_VIEWPORT_WIDTH = 1280;
export const DESKTOP_VIEWPORT_HEIGHT = 800;
/** Tall embed viewport — parent panel scrolls with a custom scrollbar */
export const PREVIEW_IFRAME_HEIGHT = 3600;

export type Language = "ru" | "en" | "am";

export type ViewMode = "work" | "services" | "about";

export type ServiceTierId = "hooks" | "packages" | "flagship" | "retainer";

export type ProjectId =
  | "aura-hair"
  | "neuro-academy"
  | "neuro-shpora"
  | "blessed-angel"
  | "jewelry-store"
  | "petcare-ai";

export type DeviceType = "monitor" | "phone";

export interface ProjectMeta {
  id: ProjectId;
  device: DeviceType;
  stack: string[];
  year: string;
  /** Shown in the desktop browser chrome address bar */
  browserLabel: string;
  /** Live site URL — when set, preview uses an iframe */
  previewUrl?: string;
}

export interface ProjectTranslation {
  title: string;
  role: string;
  description: string;
  category: string;
}

export interface UIStrings {
  heroLine: string;
  portfolioSubtitle: string;
  availability: string;
  deviceMonitor: string;
  devicePhone: string;
  livePreview: string;
  openSite: string;
  navWork: string;
  navServices: string;
  navAbout: string;
  backToMenu: string;
  packageLabel: string;
  viewInServices: string;
  projects: Record<ProjectId, ProjectTranslation>;
}

export type Dictionary = Record<Language, UIStrings>;

export function isDesktopSiteProject(meta: ProjectMeta): boolean {
  return meta.device === "monitor";
}
