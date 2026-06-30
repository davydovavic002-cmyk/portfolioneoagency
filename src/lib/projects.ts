import type { ProjectId, ProjectMeta } from "./types";

export const projects: ProjectMeta[] = [
  {
    id: "stretch-and-chill",
    device: "monitor",
    year: "2026",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    browserLabel: "pilates.neostudio.space",
    previewUrl: "https://pilates.neostudio.space/",
  },
  {
    id: "aura-hair",
    device: "monitor",
    year: "2026",
    stack: ["Next.js", "Framer Motion", "TypeScript"],
    browserLabel: "aurahair.sg",
    previewUrl: "https://aura.neostudio.space/",
  },
  {
    id: "jewelry-store",
    device: "monitor",
    year: "2026",
    stack: ["Next.js", "Stripe", "Sanity CMS"],
    browserLabel: "jellybead.store",
    previewUrl: "https://jelly.neostudio.space/",
  },
  {
    id: "petcare-ai",
    device: "monitor",
    year: "2025",
    stack: ["Next.js", "FastAPI", "OpenAI", "PostgreSQL"],
    browserLabel: "petcare.ai",
    previewUrl: "https://petcare.neostudio.space/",
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

export const defaultProjectId: ProjectId = projects[0].id;

export function getProjectMeta(id: ProjectId): ProjectMeta {
  return projects.find((p) => p.id === id) ?? projects[0];
}
