"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { caseStudiesByLanguage } from "@/lib/i18n/case-studies";
import { getProjectTheme } from "@/lib/project-themes";
import { PackageStrip } from "@/components/projects/PackageLink";

interface CaseStudyStripProps {
  projectId: ProjectId;
  language: Language;
  strings: UIStrings;
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
          className="flex items-baseline gap-1.5 rounded-full border border-black/12 bg-accent-soft px-3 py-1"
        >
          <span
            className="font-display text-sm tracking-tight"
            style={{ color: accent }}
          >
            {metric.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CaseStudyDetails({
  copy,
  study,
  textClass,
}: {
  copy: { challengeLabel: string; solutionLabel: string };
  study: { challenge: string; solution: string };
  textClass: string;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
          {copy.challengeLabel}
        </p>
        <p className={`mt-1.5 text-[12px] leading-relaxed text-muted ${textClass}`}>
          {study.challenge}
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
          {copy.solutionLabel}
        </p>
        <p className={`mt-1.5 text-[12px] leading-relaxed text-muted ${textClass}`}>
          {study.solution}
        </p>
      </div>
    </div>
  );
}

export function CaseStudyStrip({
  projectId,
  language,
  strings,
  onViewPackage,
}: CaseStudyStripProps) {
  const copy = caseStudiesByLanguage[language];
  const study = copy.byProject[projectId];
  const theme = getProjectTheme(projectId);
  const isArmenian = language === "am";
  const textClass = isArmenian ? "font-armenian" : "";
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        key={`${projectId}-desktop`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden shrink-0 border-t border-black/10 bg-canvas/90 px-5 py-4 lg:block lg:px-8"
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
          <div className="hidden h-4 w-px bg-black/10 sm:block" />
          <MetricsRow
            projectId={projectId}
            metrics={study.metrics}
            accent={theme.accent}
          />
        </div>
        <div className="mt-3 border-t border-black/8 pt-3">
          <CaseStudyDetails copy={copy} study={study} textClass={textClass} />
        </div>
      </motion.div>

      <motion.div
        key={`${projectId}-mobile`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 border-t border-black/10 bg-canvas/80 px-3 py-2.5 lg:hidden"
      >
        <PackageStrip
          projectId={projectId}
          language={language}
          strings={strings}
          accent={theme.accent}
          onViewPackage={onViewPackage}
          mobile
        />

        <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {study.metrics.map((metric) => (
            <div
              key={`${projectId}-${metric.label}`}
              className="shrink-0 rounded-xl border border-black/12 bg-accent-soft px-3 py-2 backdrop-blur-sm"
            >
              <p
                className="font-display text-base tracking-tight"
                style={{ color: theme.accent }}
              >
                {metric.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setDetailsOpen((open) => !open)}
          aria-expanded={detailsOpen}
          className="flex min-h-11 w-full items-center justify-between rounded-lg border border-black/12 bg-accent-soft px-3 py-2 text-[12px] text-muted transition-colors hover:text-ink"
        >
          <span className={textClass}>
            {detailsOpen ? copy.detailsHideLabel : copy.detailsShowLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${
              detailsOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <CaseStudyDetails copy={copy} study={study} textClass={textClass} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
