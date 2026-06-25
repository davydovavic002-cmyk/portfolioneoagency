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

interface LeftPanelProps {
  language: Language;
  activeProject: ProjectId;
  viewMode: ViewMode;
  activeTier: ServiceTierId | null;
  activeAboutSection: AboutSectionId | null;
  strings: UIStrings;
  onLanguageChange: (lang: Language) => void;
  onProjectSelect: (id: ProjectId) => void;
  onViewChange: (mode: ViewMode) => void;
  onTierSelect: (tierId: ServiceTierId) => void;
  onAboutSectionSelect: (sectionId: AboutSectionId) => void;
}

export function LeftPanel({
  language,
  activeProject,
  viewMode,
  activeTier,
  activeAboutSection,
  strings,
  onLanguageChange,
  onProjectSelect,
  onViewChange,
  onTierSelect,
  onAboutSectionSelect,
}: LeftPanelProps) {
  const isArmenian = language === "am";
  const fontClass = isArmenian ? "font-armenian" : "";
  const services = servicesByLanguage[language];
  const about = aboutByLanguage[language];

  const heroTitle =
    viewMode === "services"
      ? services.heroTitle
      : viewMode === "about"
        ? about.heroTitle
        : strings.heroLine;

  return (
    <aside className="flex h-full w-full flex-col border-white/[0.06] lg:border-r">
      <header className="shrink-0 px-5 pt-8 pb-6 safe-top lg:px-10 lg:pt-12 lg:pb-8">
        <NeoLogo className="mb-4" size={28} showWordmark />
        <div className="min-w-0">
          <p className={`text-[12px] leading-relaxed text-zinc-500 lg:text-[13px] ${fontClass}`}>
            {strings.portfolioSubtitle}
          </p>
          <h1
            className={`font-display mt-2 text-[2rem] leading-[1.05] tracking-[-0.02em] text-zinc-50 lg:mt-3 lg:text-[2.75rem] ${fontClass}`}
          >
            {heroTitle}
          </h1>
        </div>
        <div className="mt-5 w-full lg:mt-6">
          <ViewSwitcher
            mode={viewMode}
            workLabel={strings.navWork}
            servicesLabel={strings.navServices}
            aboutLabel={strings.navAbout}
            onChange={onViewChange}
            fullWidth
          />
        </div>
        <div className="mt-5 flex items-center justify-between lg:mt-6">
          <span className={`text-[13px] text-zinc-600 ${fontClass}`}>
            {strings.availability}
          </span>
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
        </div>
      </header>

      <nav className="flex-1 overflow-y-auto px-4 lg:px-6">
        {viewMode === "work" && (
          <ul>
            {projects.map((project) => {
              const translation = strings.projects[project.id];
              const isActive = activeProject === project.id;
              const theme = getProjectTheme(project.id);

              return (
                <li key={project.id} className="border-t border-white/[0.06] last:border-b">
                  <button
                    type="button"
                    onClick={() => onProjectSelect(project.id)}
                    data-active={isActive}
                    className="project-row group w-full cursor-pointer py-5 pl-5 pr-2 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                    style={{ "--accent": theme.accent } as React.CSSProperties}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex min-w-0 items-baseline gap-4">
                        <span className="shrink-0 text-[12px] tabular-nums text-zinc-600">
                          {project.year}
                        </span>
                        <h2
                          className={`truncate text-[15px] font-medium transition-colors duration-300 ${
                            isActive ? "text-zinc-50" : "text-zinc-400 group-hover:text-zinc-200"
                          } ${fontClass}`}
                        >
                          {translation.title}
                        </h2>
                      </div>
                      <span
                        className={`shrink-0 text-[11px] lg:text-[12px] ${
                          isActive ? "text-zinc-500" : "text-zinc-700"
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
                            className={`mt-3 max-w-[34ch] text-[13px] leading-[1.65] text-zinc-500 ${fontClass}`}
                          >
                            {translation.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {caseStudiesByLanguage[language].byProject[project.id].metrics.map(
                              (metric) => (
                                <span
                                  key={metric.label}
                                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500"
                                >
                                  <span style={{ color: theme.accent }}>{metric.value}</span>
                                  <span className="mx-1 text-zinc-700">·</span>
                                  {metric.label}
                                </span>
                              ),
                            )}
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-[12px] text-zinc-600">
                              {translation.role}
                            </span>
                            <span className="text-zinc-800">·</span>
                            <span className="text-[12px] text-zinc-600">
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
              <li key={tier.id} className="border-t border-white/[0.06] last:border-b">
                <button
                  type="button"
                  onClick={() => onTierSelect(tier.id)}
                  className="group w-full py-5 pl-5 pr-2 text-left transition-colors hover:bg-white/[0.02]"
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
                        ? "text-zinc-50"
                        : "text-zinc-400 group-hover:text-zinc-200"
                    } ${fontClass}`}
                  >
                    {tier.title}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {tier.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-baseline justify-between gap-2 text-[12px] text-zinc-600"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="shrink-0 tabular-nums text-zinc-500">
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
              <li key={sectionId} className="border-t border-white/[0.06] last:border-b">
                <button
                  type="button"
                  onClick={() => onAboutSectionSelect(sectionId)}
                  className="group w-full py-5 pl-5 pr-2 text-left transition-colors hover:bg-white/[0.02]"
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
                        ? "text-zinc-50"
                        : "text-zinc-400 group-hover:text-zinc-200"
                    } ${fontClass}`}
                  >
                    {sectionId === "studio" && about.studio.title}
                    {sectionId === "process" && about.process.title}
                    {sectionId === "reviews" && about.reviews.title}
                    {sectionId === "contact" && about.contact.title}
                  </h2>
                  {sectionId === "reviews" && (
                    <p className="mt-2 text-[12px] text-zinc-600">
                      {about.sectionMeta.reviews}
                    </p>
                  )}
                  {sectionId === "process" && (
                    <p className="mt-2 text-[12px] text-zinc-600">
                      {about.sectionMeta.process}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <footer className="shrink-0 px-5 py-4 safe-bottom lg:px-10 lg:py-6">
        <p className="text-[12px] tabular-nums text-zinc-700">
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
              <span className="mx-1.5 text-zinc-800">·</span>
              <span className="text-zinc-600">{strings.navServices}</span>
            </>
          )}
          {viewMode === "about" && (
            <>
              0{ABOUT_SECTIONS.length}
              <span className="mx-1.5 text-zinc-800">·</span>
              <span className="text-zinc-600">{strings.navAbout}</span>
            </>
          )}
        </p>
      </footer>
    </aside>
  );
}
