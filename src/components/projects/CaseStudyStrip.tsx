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

function MetricsRow({
  projectId,
  metrics,
  accent,
}: {
  projectId: ProjectId;
  metrics: { value: string; label: string }[];
  accent: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((metric) => (
        <div
          key={`${projectId}-${metric.label}`}
          className="flex items-baseline gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1"
        >
          <span
            className="font-display text-sm tracking-tight"
            style={{ color: accent }}
          >
            {metric.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
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
  const textClass = isArmenian ? "font-armenian" : "";

  if (!isMobile) {
    return (
      <motion.div
        key={projectId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 border-t border-white/[0.06] bg-[#0a0a0a]/90 px-5 py-4 lg:px-8"
      >
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
          <PackageStrip
            projectId={projectId}
            language={language}
            strings={strings}
            accent={theme.accent}
            onViewPackage={onViewPackage}
            inline
          />
          <div className="hidden h-4 w-px bg-white/[0.08] sm:block" />
          <MetricsRow
            projectId={projectId}
            metrics={study.metrics}
            accent={theme.accent}
          />
        </div>
        <div className="mt-3 hidden gap-6 border-t border-white/[0.05] pt-3 lg:grid lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
              {copy.challengeLabel}
            </p>
            <p
              className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 ${textClass}`}
            >
              {study.challenge}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
              {copy.solutionLabel}
            </p>
            <p
              className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 ${textClass}`}
            >
              {study.solution}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={projectId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 border-t border-white/[0.06] bg-[#0a0a0a]/80 px-3 py-3"
    >
      <PackageStrip
        projectId={projectId}
        language={language}
        strings={strings}
        accent={theme.accent}
        onViewPackage={onViewPackage}
        isMobile
      />

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {study.metrics.map((metric) => (
          <div
            key={`${projectId}-${metric.label}`}
            className="shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm"
          >
            <p
              className="font-display text-lg tracking-tight"
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

      <div className="grid gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            {copy.challengeLabel}
          </p>
          <p
            className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 ${textClass}`}
          >
            {study.challenge}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            {copy.solutionLabel}
          </p>
          <p
            className={`mt-1.5 text-[12px] leading-relaxed text-zinc-400 ${textClass}`}
          >
            {study.solution}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
