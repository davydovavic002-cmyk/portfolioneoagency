import type { ProjectId, ProjectMeta } from "./types";

export const projects: ProjectMeta[] = [
  {
    id: "jewelry-store",
    device: "monitor",
    year: "2026",
    stack: ["Next.js", "Stripe", "Sanity CMS"],
    browserLabel: "jellybead.store",
    previewUrl: "http://45.91.169.30:3333/",
  },
  {
    id: "petcare-ai",
    device: "monitor",
    year: "2026",
    stack: ["Next.js", "FastAPI", "OpenAI", "PostgreSQL"],
    browserLabel: "petcare.ai",
    previewUrl: "http://45.91.169.30:3334/",
  },
  {
    id: "neuro-academy",
    device: "monitor",
    year: "2025",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI"],
    browserLabel: "neuro-academy.app",
    previewUrl: "http://45.91.169.30:3000/",
  },
  {
    id: "neuro-shpora",
    device: "phone",
    year: "2025",
    stack: ["Python", "aiogram", "OpenAI", "Redis"],
    browserLabel: "t.me/neuroshpora",
  },
  {
    id: "blessed-angel",
    device: "monitor",
    year: "2024",
    stack: ["Next.js", "Framer Motion", "Three.js"],
    browserLabel: "blessedangel.store",
    previewUrl: "https://blessedangel.store",
  },
];

export const defaultProjectId: ProjectId = "neuro-academy";

export function getProjectMeta(id: ProjectId): ProjectMeta {
  return projects.find((p) => p.id === id) ?? projects[0];
}
