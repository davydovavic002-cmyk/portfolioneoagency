import type { ProjectId } from "./types";

export const projectThemes: Record<
  ProjectId,
  { accent: string; glow: string }
> = {
  "aura-hair": {
    accent: "#b85c6e",
    glow: "rgba(184, 92, 110, 0.16)",
  },
  "neuro-shpora": {
    accent: "#5b9fd4",
    glow: "rgba(91, 159, 212, 0.16)",
  },
  "blessed-angel": {
    accent: "#d4c4a8",
    glow: "rgba(212, 196, 168, 0.14)",
  },
  "jewelry-store": {
    accent: "#c9b896",
    glow: "rgba(201, 184, 150, 0.14)",
  },
  "petcare-ai": {
    accent: "#7cb89a",
    glow: "rgba(124, 184, 154, 0.16)",
  },
  "stretch-and-chill": {
    accent: "#b895a8",
    glow: "rgba(184, 149, 168, 0.16)",
  },
};

export function getProjectTheme(id: ProjectId) {
  return projectThemes[id];
}
