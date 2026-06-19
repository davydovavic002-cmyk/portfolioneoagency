"use client";

import type { Language, ProjectId } from "@/lib/types";
import { isDesktopSiteProject } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { SimulatorView } from "@/components/simulator/SimulatorView";
import { getProjectMeta } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";

interface RightPanelProps {
  language: Language;
  activeProject: ProjectId;
  strings: UIStrings;
}

export function RightPanel({ language, activeProject, strings }: RightPanelProps) {
  const meta = getProjectMeta(activeProject);
  const theme = getProjectTheme(activeProject);
  const isDesktopSite = isDesktopSiteProject(meta);
  const deviceLabel =
    meta.device === "monitor" ? strings.deviceMonitor : strings.devicePhone;
  const isArmenian = language === "am";

  return (
    <section className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#080808]">
      {!isDesktopSite && (
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${theme.glow} 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative flex min-h-0 flex-1 flex-col">
        {!isDesktopSite && (
          <div className="flex shrink-0 items-center justify-end gap-4 px-12 pt-10">
            <span className="text-[12px] tabular-nums text-zinc-600">{meta.year}</span>
            <span className="text-[12px]" style={{ color: theme.accent }}>
              {deviceLabel}
            </span>
          </div>
        )}

        <div
          className={`relative min-h-0 flex-1 ${
            isDesktopSite ? "px-5 pb-4 pt-5" : "px-8 pb-6 pt-2"
          }`}
        >
          <SimulatorView activeProject={activeProject} language={language} />
        </div>

        <div
          className={`shrink-0 border-t border-white/[0.06] ${
            isDesktopSite ? "px-5 py-3" : "px-12 py-5"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2
                className={`truncate font-display text-lg tracking-[-0.01em] text-zinc-100 ${
                  isArmenian ? "font-armenian" : ""
                }`}
              >
                {strings.projects[activeProject].title}
              </h2>
              {!isDesktopSite && (
                <p className="mt-1 text-[13px] text-zinc-500">
                  {strings.projects[activeProject].role}
                  <span className="mx-2 text-zinc-800">—</span>
                  {strings.projects[activeProject].category}
                </p>
              )}
            </div>
            {isDesktopSite && (
              <span className="shrink-0 text-[12px] text-zinc-600">{deviceLabel}</span>
            )}
            {!isDesktopSite && (
              <div
                className="h-px w-12 shrink-0"
                style={{ backgroundColor: theme.accent, opacity: 0.5 }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
