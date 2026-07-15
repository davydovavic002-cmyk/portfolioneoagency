export const SITE_SECTIONS = ["work", "services", "brief", "about"] as const;

export type SiteSectionId = (typeof SITE_SECTIONS)[number];

export const STACK_MARQUEE = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "OpenAI",
  "Telegram",
  "Supabase",
  "Framer Motion",
  "Tailwind CSS",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Stripe",
  "Vite",
  "Three.js",
] as const;

export const HERO_PILLS = [
  "Full-stack",
  "AI agents",
  "Product design",
  "Telegram bots",
  "Fixed pricing",
  "Live previews",
] as const;
