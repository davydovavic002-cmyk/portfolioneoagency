"use client";

import { ArrowUpRight } from "lucide-react";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { projects, getProjectMeta } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";

interface WorkBentoGridProps {
  language: Language;
  strings: UIStrings;
  activeProject: ProjectId;
  onProjectSelect: (id: ProjectId) => void;
}

export function WorkBentoGrid({
  language,
  strings,
  activeProject,
  onProjectSelect,
}: WorkBentoGridProps) {
  const fontClass = language === "am" ? "font-armenian" : "";

  return (
    <div className="bento-grid sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const translation = strings.projects[project.id];
        const theme = getProjectTheme(project.id);
        const meta = getProjectMeta(project.id);
        const isActive = activeProject === project.id;

        return (
          <article
            key={project.id}
            data-active={isActive}
            className={`project-tile group relative overflow-hidden p-5 lg:p-6 ${fontClass} ${
              isActive ? "ring-2 ring-pink/25" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onProjectSelect(project.id)}
              className="relative z-10 w-full text-left"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 transition-all group-hover:h-2"
                style={{ backgroundColor: isActive ? "var(--color-pink)" : theme.accent }}
              />
              <div className="flex items-start justify-between gap-3">
                <span className="text-[12px] font-semibold text-faint">{project.year}</span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? "border-pink bg-pink text-white"
                      : "border-line text-muted group-hover:border-pink group-hover:text-pink"
                  }`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-tight tracking-[-0.03em] text-ink lg:text-xl">
                {translation.title}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-muted">{translation.category}</p>
              <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted">
                {translation.description}
              </p>
            </button>
            {meta.previewUrl && (
              <a
                href={meta.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 mt-4 inline-block text-[12px] font-semibold text-accent hover:underline"
              >
                {strings.openSite}
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}
