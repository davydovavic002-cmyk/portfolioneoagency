"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Language, ProjectId, ServiceTierId, ViewMode } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { projects } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";
import { servicesByLanguage, TIER_ACCENTS } from "@/lib/i18n/services";
import {
  aboutByLanguage,
  ABOUT_ACCENT,
  ABOUT_SECTIONS,
  type AboutSectionId,
} from "@/lib/i18n/about";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ViewSwitcher } from "./ViewSwitcher";
import { NeoLogo } from "@/components/brand/NeoLogo";
import { caseStudiesByLanguage } from "@/lib/i18n/case-studies";
import { PackageBadge } from "@/components/projects/PackageLink";
import {
  BRIEF_STEP_ORDER,
  BRIEF_TOTAL_STEPS,
  type BriefProgress,
} from "@/components/brief/BriefView";
import { briefCopy } from "@/lib/brief/copy";
import { SITE_CONFIG } from "@/config/site";

interface LeftPanelProps {
  language: Language;
  activeProject: ProjectId;
  viewMode: ViewMode;
  activeTier: ServiceTierId | null;
  activeAboutSection: AboutSectionId | null;
  briefProgress: BriefProgress;
  strings: UIStrings;
  onLanguageChange: (lang: Language) => void;
  onProjectSelect: (id: ProjectId) => void;
  onViewChange: (mode: ViewMode) => void;
  onTierSelect: (tierId: ServiceTierId) => void;
  onAboutSectionSelect: (sectionId: AboutSectionId) => void;
  onViewPackage: (projectId: ProjectId) => void;
}

export function LeftPanel({
  language,
  activeProject,
  viewMode,
  activeTier,
  activeAboutSection,
  briefProgress,
  strings,
  onLanguageChange,
  onProjectSelect,
  onViewChange,
  onTierSelect,
  onAboutSectionSelect,
  onViewPackage,
}: LeftPanelProps) {
  const isArmenian = language === "am";
  const fontClass = isArmenian ? "font-armenian" : "";
  const services = servicesByLanguage[language];
  const about = aboutByLanguage[language];

  const heroTitle =
    viewMode === "brief"
      ? strings.briefHeroTitle
      : viewMode === "services"
        ? services.heroTitle
        : viewMode === "about"
          ? about.heroTitle
          : strings.heroLine;

  const heroSubtitle =
    viewMode === "brief"
      ? strings.briefHeroSubtitle
      : strings.portfolioSubtitle;

  return (
    <aside className="flex h-full w-full flex-col border-black/10 bg-paper/80 backdrop-blur-sm lg:border-r">
      <header className="shrink-0 px-5 pt-safe-8 pb-6 lg:px-10 lg:pt-safe-12 lg:pb-8">
        <NeoLogo className="mb-5" size={34} showWordmark />
        <p className="section-label">{SITE_CONFIG.brandName}</p>
        <div className="min-w-0">
          <p className={`mt-2 text-[12px] leading-relaxed text-muted lg:text-[13px] ${fontClass}`}>
            {heroSubtitle}
          </p>
          <h1
            className={`font-display mt-2 text-[2.25rem] leading-[0.95] tracking-[-0.03em] text-ink lg:mt-3 lg:text-[3rem] ${fontClass}`}
          >
            {heroTitle}
          </h1>
        </div>
        <div className="mt-5 w-full lg:mt-6">
          <ViewSwitcher
            mode={viewMode}
            briefLabel={strings.navBrief}
            workLabel={strings.navWork}
            servicesLabel={strings.navServices}
            aboutLabel={strings.navAbout}
            onChange={onViewChange}
            fullWidth
          />
        </div>
        <div className="mt-5 flex items-center justify-between lg:mt-6">
          <span className={`text-[13px] text-faint ${fontClass}`}>{strings.availability}</span>
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
        </div>
      </header>

      <nav className="flex-1 overflow-y-auto px-4 lg:px-6">
        {viewMode === "brief" && (
          <ul>
            {BRIEF_STEP_ORDER.map((stepKey, index) => {
              const isComplete =
                briefProgress.showResult || index < briefProgress.step;
              const isActive =
                !briefProgress.showResult && index === briefProgress.step;
              const stepLabels: Record<(typeof BRIEF_STEP_ORDER)[number], string> = {
                projectType: briefCopy.projectType.label,
                industry: briefCopy.industry.label,
                budget: briefCopy.budget.label,
                timeline: briefCopy.timeline.label,
              };

              return (
                <li key={stepKey} className="border-t border-black/10 last:border-b">
                  <div
                    className={`py-5 pl-5 pr-2 transition-colors ${
                      isActive ? "bg-accent-soft" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] tabular-nums transition-colors ${
                          isComplete
                            ? "border-accent/40 bg-accent-soft text-accent"
                            : isActive
                              ? "border-accent bg-accent text-white"
                              : "border-black/12 text-faint"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-[10px] font-medium uppercase tracking-[0.2em] ${
                            isActive ? "text-accent" : "text-faint"
                          }`}
                        >
                          {briefCopy.step(index + 1, BRIEF_TOTAL_STEPS)}
                        </p>
                        <h2
                          className={`mt-1 text-[15px] font-medium ${
                            isActive
                              ? "text-ink"
                              : isComplete
                                ? "text-muted"
                                : "text-faint"
                          }`}
                        >
                          {stepLabels[stepKey]}
                        </h2>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="border-t border-black/10 last:border-b">
              <div
                className={`py-5 pl-5 pr-2 ${
                  briefProgress.showResult ? "bg-accent-soft" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                      briefProgress.showResult
                        ? "border-accent/40 bg-accent-soft text-accent"
                        : "border-black/12 text-faint"
                    }`}
                  >
                    →
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                      Result
                    </p>
                    <h2
                      className={`mt-1 text-[15px] font-medium ${
                        briefProgress.showResult ? "text-ink" : "text-faint"
                      }`}
                    >
                      {briefCopy.resultTitle}
                    </h2>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}

        {viewMode === "work" && (
          <ul>
            {projects.map((project) => {
              const translation = strings.projects[project.id];
              const isActive = activeProject === project.id;
              const theme = getProjectTheme(project.id);

              return (
                <li key={project.id} className="border-t border-black/10 last:border-b">
                  <button
                    type="button"
                    onClick={() => onProjectSelect(project.id)}
                    data-active={isActive}
                    className="project-row group w-full cursor-pointer py-5 pl-5 pr-2 text-left transition-colors duration-300 hover:bg-accent-soft/60"
                    style={{ "--accent": theme.accent } as React.CSSProperties}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex min-w-0 items-baseline gap-4">
                        <span className="shrink-0 text-[12px] tabular-nums text-faint">
                          {project.year}
                        </span>
                        <h2
                          className={`truncate text-[15px] font-medium transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-muted group-hover:text-ink"
                          } ${fontClass}`}
                        >
                          {translation.title}
                        </h2>
                      </div>
                      <span
                        className={`shrink-0 text-[11px] lg:text-[12px] ${
                          isActive ? "text-muted" : "text-faint"
                        }`}
                      >
                        {translation.category}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p
                            className={`mt-3 max-w-[34ch] text-[13px] leading-[1.65] text-muted ${fontClass}`}
                          >
                            {translation.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {caseStudiesByLanguage[language].byProject[project.id].metrics.map(
                              (metric) => (
                                <span
                                  key={metric.label}
                                  className="rounded-full border border-black/10 bg-paper px-2.5 py-1 text-[10px] text-muted"
                                >
                                  <span style={{ color: theme.accent }}>{metric.value}</span>
                                  <span className="mx-1 text-faint">·</span>
                                  {metric.label}
                                </span>
                              ),
                            )}
                          </div>
                          <PackageBadge
                            projectId={project.id}
                            language={language}
                            strings={strings}
                            accent={theme.accent}
                            onViewPackage={onViewPackage}
                            className="mt-3"
                          />
                          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-[12px] text-faint">
                              {translation.role}
                            </span>
                            <span className="text-faint">·</span>
                            <span className="text-[12px] text-faint">
                              {project.stack.join(" · ")}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {viewMode === "services" && (
          <ul>
            {services.tiers.map((tier) => (
              <li key={tier.id} className="border-t border-black/10 last:border-b">
                <button
                  type="button"
                  onClick={() => onTierSelect(tier.id)}
                  className="group w-full py-5 pl-5 pr-2 text-left transition-colors hover:bg-accent-soft/60"
                >
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: TIER_ACCENTS[tier.id] }}
                  >
                    {tier.level}
                  </p>
                  <h2
                    className={`mt-1 text-[15px] font-medium transition-colors ${
                      activeTier === tier.id
                        ? "text-accent"
                        : "text-muted group-hover:text-ink"
                    } ${fontClass}`}
                  >
                    {tier.title}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {tier.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-baseline justify-between gap-2 text-[12px] text-muted"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="shrink-0 tabular-nums text-faint">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </button>
              </li>
            ))}
          </ul>
        )}

        {viewMode === "about" && (
          <ul>
            {ABOUT_SECTIONS.map((sectionId) => (
              <li key={sectionId} className="border-t border-black/10 last:border-b">
                <button
                  type="button"
                  onClick={() => onAboutSectionSelect(sectionId)}
                  className="group w-full py-5 pl-5 pr-2 text-left transition-colors hover:bg-accent-soft/60"
                >
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: ABOUT_ACCENT }}
                  >
                    {about.sections[sectionId]}
                  </p>
                  <h2
                    className={`mt-1 text-[15px] font-medium transition-colors ${
                      activeAboutSection === sectionId
                        ? "text-accent"
                        : "text-muted group-hover:text-ink"
                    } ${fontClass}`}
                  >
                    {sectionId === "studio" && about.studio.title}
                    {sectionId === "process" && about.process.title}
                    {sectionId === "reviews" && about.reviews.title}
                    {sectionId === "contact" && about.contact.title}
                  </h2>
                  {sectionId === "reviews" && (
                    <p className="mt-2 text-[12px] text-faint">
                      {about.sectionMeta.reviews}
                    </p>
                  )}
                  {sectionId === "process" && (
                    <p className="mt-2 text-[12px] text-faint">
                      {about.sectionMeta.process}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <footer className="shrink-0 px-5 py-safe-4 lg:px-10 lg:py-safe-6">
        <p className="text-[12px] tabular-nums text-faint">
          {viewMode === "brief" && (
            <>
              0{BRIEF_TOTAL_STEPS}
              <span className="mx-1.5 text-faint">·</span>
              <span className="text-muted">2 min</span>
            </>
          )}
          {viewMode === "work" && (
            <>
              0{projects.findIndex((p) => p.id === activeProject) + 1}
              <span className="mx-1.5">/</span>
              0{projects.length}
            </>
          )}
          {viewMode === "services" && (
            <>
              0{services.tiers.length}
              <span className="mx-1.5 text-faint">·</span>
              <span className="text-muted">{strings.navServices}</span>
            </>
          )}
          {viewMode === "about" && (
            <>
              0{ABOUT_SECTIONS.length}
              <span className="mx-1.5 text-faint">·</span>
              <span className="text-muted">{strings.navAbout}</span>
            </>
          )}
        </p>
      </footer>
    </aside>
  );
}
