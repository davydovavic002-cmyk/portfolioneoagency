"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { isDesktopSiteProject } from "@/lib/types";
import { getProjectMeta } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";
import { SectionShell } from "@/components/layout/SectionShell";
import { scrollToSection } from "@/lib/scroll-spy";
import { SimulatorView } from "@/components/simulator/SimulatorView";
import { CaseStudyStrip } from "@/components/projects/CaseStudyStrip";
import { PackageBadge } from "@/components/projects/PackageLink";
import { WorkBentoGrid } from "./WorkBentoGrid";

interface WorkSectionProps {
  language: Language;
  strings: UIStrings;
  activeProject: ProjectId;
  onProjectSelect: (id: ProjectId) => void;
  onViewPackage: (projectId: ProjectId) => void;
}

export function WorkSection({
  language,
  strings,
  activeProject,
  onProjectSelect,
  onViewPackage,
}: WorkSectionProps) {
  const theme = getProjectTheme(activeProject);
  const isDesktopSite = isDesktopSiteProject(getProjectMeta(activeProject));
  const fontClass = language === "am" ? "font-armenian" : "";
  const translation = strings.projects[activeProject];

  return (
    <SectionShell
      id="work"
      label={strings.navWork}
      title={strings.heroLine}
      subtitle={strings.portfolioSubtitle}
    >
      <p className="-mt-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 text-[13px] text-muted">
        <span>{strings.workSelectHint}</span>
        <span className="monica-track text-[10px] text-ink/50">2024–2026</span>
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          id="work-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="preview-shell mb-3 lg:mb-4"
        >
          <div
            className={`relative ${
              isDesktopSite
                ? "h-[min(62vh,560px)] min-h-[320px] p-2"
                : "flex h-[min(64vh,580px)] min-h-[400px] items-center justify-center p-4"
            }`}
            style={
              !isDesktopSite
                ? {
                    background: `radial-gradient(circle at 50% 30%, ${theme.glow} 0%, transparent 65%)`,
                  }
                : undefined
            }
          >
            <SimulatorView activeProject={activeProject} language={language} />
          </div>

          <CaseStudyStrip
            projectId={activeProject}
            language={language}
            strings={strings}
            onViewPackage={onViewPackage}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4">
            <div>
              <h3 className={`text-lg font-bold tracking-[-0.02em] lg:text-xl ${fontClass}`}>
                {translation.title}
              </h3>
              <p className={`mt-0.5 text-[13px] text-muted ${fontClass}`}>
                {translation.role} · {translation.category}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PackageBadge
                projectId={activeProject}
                language={language}
                strings={strings}
                accent={theme.accent}
                onViewPackage={onViewPackage}
              />
              <button
                type="button"
                onClick={() => scrollToSection("brief")}
                className="btn-pink !min-h-11 !py-2 !text-[12px]"
              >
                {strings.heroCtaBrief}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <WorkBentoGrid
        language={language}
        strings={strings}
        activeProject={activeProject}
        onProjectSelect={onProjectSelect}
      />
    </SectionShell>
  );
}
