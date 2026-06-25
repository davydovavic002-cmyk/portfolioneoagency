"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Language, ProjectId, ServiceTierId, ViewMode } from "@/lib/types";
import { isDesktopSiteProject } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { SimulatorView } from "@/components/simulator/SimulatorView";
import { PricingView } from "@/components/pricing/PricingView";
import { AboutView } from "@/components/about/AboutView";
import { getProjectMeta } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";
import { servicesByLanguage } from "@/lib/i18n/services";
import { aboutByLanguage, type AboutSectionId } from "@/lib/i18n/about";

interface RightPanelProps {
  language: Language;
  activeProject: ProjectId;
  viewMode: ViewMode;
  activeTier: ServiceTierId | null;
  activeAboutSection: AboutSectionId | null;
  strings: UIStrings;
  isMobile?: boolean;
}

export function RightPanel({
  language,
  activeProject,
  viewMode,
  activeTier,
  activeAboutSection,
  strings,
  isMobile = false,
}: RightPanelProps) {
  const meta = getProjectMeta(activeProject);
  const theme = getProjectTheme(activeProject);
  const isDesktopSite = isDesktopSiteProject(meta);
  const deviceLabel =
    meta.device === "monitor" ? strings.deviceMonitor : strings.devicePhone;
  const isArmenian = language === "am";
  const services = servicesByLanguage[language];
  const about = aboutByLanguage[language];

  if (viewMode === "about") {
    return (
      <section className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#080808]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(167,139,250,0.08)_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_100%,rgba(96,165,250,0.06)_0%,transparent_50%)]" />
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <AboutView language={language} scrollToSection={activeAboutSection} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="shrink-0 border-t border-white/[0.06] px-5 py-3 safe-bottom lg:px-10 lg:py-4">
          <p className={`text-[13px] text-zinc-500 ${isArmenian ? "font-armenian" : ""}`}>
            {about.heroSubtitle}
          </p>
        </div>
      </section>
    );
  }

  if (viewMode === "services") {
    return (
      <section className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#080808]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(96,165,250,0.08)_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_100%,rgba(167,139,250,0.06)_0%,transparent_50%)]" />
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PricingView language={language} scrollToTier={activeTier} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="shrink-0 border-t border-white/[0.06] px-5 py-3 safe-bottom lg:px-10 lg:py-4">
          <p className={`text-[13px] text-zinc-500 ${isArmenian ? "font-armenian" : ""}`}>
            {services.heroSubtitle}
          </p>
        </div>
      </section>
    );
  }

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
        {!isDesktopSite && !isMobile && (
          <div className="flex shrink-0 items-center justify-end gap-4 px-12 pt-10">
            <span className="text-[12px] tabular-nums text-zinc-600">{meta.year}</span>
            <span className="text-[12px]" style={{ color: theme.accent }}>
              {deviceLabel}
            </span>
          </div>
        )}

        <div
          className={`relative min-h-0 flex-1 ${
            isDesktopSite
              ? isMobile
                ? "flex flex-col px-2 pb-2 pt-2"
                : "px-3 pb-3 pt-3 lg:px-5 lg:pb-4 lg:pt-5"
              : isMobile
                ? "px-3 pb-3 pt-2"
                : "px-8 pb-6 pt-2"
          }`}
        >
          <SimulatorView
            activeProject={activeProject}
            language={language}
            isMobile={isMobile}
          />
        </div>

        <div
          className={`shrink-0 border-t border-white/[0.06] safe-bottom ${
            isDesktopSite ? "px-3 py-2.5 lg:px-5 lg:py-3" : "px-4 py-3 lg:px-12 lg:py-5"
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
              <span className="shrink-0 text-[12px] text-zinc-600">
                {isMobile ? strings.livePreview : deviceLabel}
              </span>
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
