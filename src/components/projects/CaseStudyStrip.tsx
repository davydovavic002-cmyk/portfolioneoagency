"use client";

import { motion } from "framer-motion";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { caseStudiesByLanguage } from "@/lib/i18n/case-studies";
import { getProjectTheme } from "@/lib/project-themes";
import { PackageStrip } from "@/components/projects/PackageLink";

interface CaseStudyStripProps {
  projectId: ProjectId;
  language: Language;
  strings: UIStrings;
  isMobile?: boolean;
  onViewPackage: (projectId: ProjectId) => void;
}

export function CaseStudyStrip({
  projectId,
  language,
  strings,
  isMobile = false,
  onViewPackage,
}: CaseStudyStripProps) {
  const copy = caseStudiesByLanguage[language];
  const study = copy.byProject[projectId];
  const theme = getProjectTheme(projectId);
  const isArmenian = language === "am";

  return (
    <motion.div
      key={projectId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`shrink-0 border-t border-white/[0.06] bg-[#0a0a0a]/80 ${
        isMobile ? "px-3 py-3" : "px-5 py-4 lg:px-8 lg:py-5"
      }`}
    >
      <PackageStrip
        projectId={projectId}
        language={language}
        strings={strings}
        accent={theme.accent}
        onViewPackage={onViewPackage}
        isMobile={isMobile}
      />

      <div
        className={`flex gap-2 overflow-x-auto pb-1 ${
          isMobile ? "mb-3" : "mb-4 lg:gap-3"
        }`}
      >
        {study.metrics.map((metric) => (
          <div
            key={metric.label}
            className="shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm lg:min-w-[100px] lg:px-4"
          >
            <p
              className="font-display text-lg tracking-tight lg:text-xl"
              style={{ color: theme.accent }}
            >
              {metric.value}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`grid gap-3 ${isMobile ? "hidden" : "grid-cols-1 lg:grid-cols-2 lg:gap-4"}`}
      >
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            {copy.challengeLabel}
          </p>
          <p
            className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 lg:text-[13px] ${
              isArmenian ? "font-armenian" : ""
            }`}
          >
            {study.challenge}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            {copy.solutionLabel}
          </p>
          <p
            className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 lg:text-[13px] ${
              isArmenian ? "font-armenian" : ""
            }`}
          >
            {study.solution}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
