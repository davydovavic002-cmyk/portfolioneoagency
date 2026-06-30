export const DESKTOP_VIEWPORT_WIDTH = 1280;
export const DESKTOP_VIEWPORT_HEIGHT = 800;
/** Tall embed viewport — parent panel scrolls with a custom scrollbar */
export const PREVIEW_IFRAME_MIN_HEIGHT = 720;
export const PREVIEW_IFRAME_DEFAULT_HEIGHT = 3600;
/** Used when cross-origin blocks measurement — must fit long landing pages */
export const PREVIEW_IFRAME_FALLBACK_HEIGHT = 12000;
export const PREVIEW_IFRAME_MAX_HEIGHT = 16000;
/** @deprecated use PREVIEW_IFRAME_DEFAULT_HEIGHT */
export const PREVIEW_IFRAME_HEIGHT = PREVIEW_IFRAME_DEFAULT_HEIGHT;

export type Language = "ru" | "en" | "am";

export type ViewMode = "brief" | "work" | "services" | "about";

export type ServiceTierId = "hooks" | "packages" | "flagship" | "retainer";

export type ProjectId =
  | "aura-hair"
  | "neuro-shpora"
  | "blessed-angel"
  | "jewelry-store"
  | "petcare-ai"
  | "stretch-and-chill";

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
  /** Initial iframe height before postMessage (compact previews only) */
  previewInitialHeight?: number;
  /** Max iframe height cap (prevents stretched footers on short pages) */
  previewMaxHeight?: number;
  /** Trust postMessage height as source of truth (allow shrink on route change) */
  previewExactPostMessage?: boolean;
  /** Extra px added to postMessage height (pilates measures to sentinel — use 0) */
  previewPostMessagePadding?: number;
  /** Per-route iframe height caps — pilates /schedule only */
  previewSubpageMaxHeights?: Record<string, number>;
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
  navBrief: string;
  navWork: string;
  navServices: string;
  navAbout: string;
  briefHeroTitle: string;
  briefHeroSubtitle: string;
  backToMenu: string;
  packageLabel: string;
  viewInServices: string;
  projects: Record<ProjectId, ProjectTranslation>;
}

export type Dictionary = Record<Language, UIStrings>;

export function isDesktopSiteProject(meta: ProjectMeta): boolean {
  return meta.device === "monitor";
}
