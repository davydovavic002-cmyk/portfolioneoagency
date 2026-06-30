"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language, ProjectId, ViewMode } from "@/lib/types";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { MobileContentHeader } from "@/components/layout/MobileContentHeader";
import { INITIAL_BRIEF_PROGRESS, type BriefProgress } from "@/components/brief/BriefView";
import type { ServiceTierId } from "@/lib/types";
import type { AboutSectionId } from "@/lib/i18n/about";
import type { BriefAnswers, BriefProjectType } from "@/lib/brief/types";
import {
  getProjectPackage,
  serviceItemElementId,
  type ServiceItemId,
} from "@/lib/project-packages";
import {
  isMobileViewport,
  opensMobileContentForView,
} from "@/lib/mobile-viewport";

const LANG_STORAGE_KEY = "neo-portfolio-lang";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ru" || value === "am";
}

function isBriefProjectType(value: string | null): value is BriefProjectType {
  return (
    value === "landing" ||
    value === "multipage" ||
    value === "ecommerce" ||
    value === "telegram-bot" ||
    value === "ai-product" ||
    value === "web-design"
  );
}

function syncMobileContentVisibility(mode: ViewMode): boolean {
  if (mode === "work") return false;
  return opensMobileContentForView(mode);
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");
  const [viewMode, setViewMode] = useState<ViewMode>("brief");
  const [activeTier, setActiveTier] = useState<ServiceTierId | null>(null);
  const [activeServiceItem, setActiveServiceItem] = useState<ServiceItemId | null>(null);
  const [activeAboutSection, setActiveAboutSection] = useState<AboutSectionId | null>(
    null,
  );
  const [mobileShowContent, setMobileShowContent] = useState(true);
  const [briefProgress, setBriefProgress] = useState<BriefProgress>(INITIAL_BRIEF_PROGRESS);
  const [briefInitialAnswers, setBriefInitialAnswers] = useState<
    Partial<BriefAnswers> | undefined
  >();

  const strings = dictionary[language];

  const handleBriefProgressChange = useCallback((progress: BriefProgress) => {
    setBriefProgress(progress);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("brief") === "1") {
      setViewMode("brief");
      setMobileShowContent(true);
    }
    const type = params.get("type");
    if (isBriefProjectType(type)) {
      setBriefInitialAnswers({ projectType: type });
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLanguage(stored)) setLanguage(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
    document.documentElement.lang = language === "am" ? "hy" : language;
  }, [language]);

  const scrollToServiceItem = (itemId: ServiceItemId, tierId: ServiceTierId) => {
    requestAnimationFrame(() => {
      document.getElementById(serviceItemElementId(itemId))?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      document.getElementById(`tier-${tierId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  };

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (isMobileViewport()) {
      setMobileShowContent(syncMobileContentVisibility(mode));
    }
    if (mode === "work") {
      setActiveTier(null);
      setActiveServiceItem(null);
      setActiveAboutSection(null);
    }
    if (mode === "services") {
      setActiveAboutSection(null);
    }
    if (mode === "about") {
      setActiveTier(null);
      setActiveServiceItem(null);
    }
    if (isMobileViewport() && (mode === "services" || mode === "about")) {
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(".preview-scroll")?.scrollTo({ top: 0 });
      });
    }
  };

  const handleProjectSelect = (id: ProjectId) => {
    setActiveProject(id);
    setViewMode("work");
    setActiveTier(null);
    setActiveServiceItem(null);
    setActiveAboutSection(null);
    if (isMobileViewport()) setMobileShowContent(true);
  };

  const handleTierSelect = (tierId: ServiceTierId) => {
    setViewMode("services");
    setActiveTier(tierId);
    setActiveServiceItem(null);
    setActiveAboutSection(null);
    if (isMobileViewport()) setMobileShowContent(true);
    requestAnimationFrame(() => {
      document.getElementById(`tier-${tierId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleAboutSectionSelect = (sectionId: AboutSectionId) => {
    setViewMode("about");
    setActiveTier(null);
    setActiveServiceItem(null);
    setActiveAboutSection(sectionId);
    if (isMobileViewport()) setMobileShowContent(true);
    requestAnimationFrame(() => {
      document.getElementById(`about-${sectionId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleViewPackage = (projectId: ProjectId = activeProject) => {
    const pkg = getProjectPackage(projectId, language);
    if (!pkg) return;

    setViewMode("services");
    setActiveTier(pkg.tierId);
    setActiveServiceItem(pkg.itemId);
    setActiveAboutSection(null);
    if (isMobileViewport()) setMobileShowContent(true);
    scrollToServiceItem(pkg.itemId, pkg.tierId);
  };

  return (
    <main
      className={`flex h-dvh w-screen flex-col overflow-hidden bg-[#080808] lg:flex-row ${
        language === "am" ? "font-armenian" : ""
      }`}
    >
      <div
        className={`flex min-h-0 flex-1 flex-col lg:h-full lg:min-w-[400px] lg:max-w-[480px] lg:flex-none lg:w-[38%] ${
          mobileShowContent ? "max-lg:hidden" : "max-lg:flex"
        }`}
      >
        <LeftPanel
          language={language}
          activeProject={activeProject}
          viewMode={viewMode}
          activeTier={activeTier}
          activeAboutSection={activeAboutSection}
          briefProgress={briefProgress}
          strings={strings}
          onLanguageChange={setLanguage}
          onProjectSelect={handleProjectSelect}
          onViewChange={handleViewChange}
          onTierSelect={handleTierSelect}
          onAboutSectionSelect={handleAboutSectionSelect}
          onViewPackage={handleViewPackage}
        />
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden lg:h-full lg:min-w-0 ${
          mobileShowContent ? "max-lg:flex" : "max-lg:hidden"
        }`}
      >
        <MobileContentHeader
          strings={strings}
          language={language}
          viewMode={viewMode}
          backLabel={strings.backToMenu}
          visible={mobileShowContent}
          onBack={() => setMobileShowContent(false)}
          onViewChange={handleViewChange}
          onLanguageChange={setLanguage}
        />
        <RightPanel
          language={language}
          activeProject={activeProject}
          viewMode={viewMode}
          activeTier={activeTier}
          activeServiceItem={activeServiceItem}
          activeAboutSection={activeAboutSection}
          briefProgress={briefProgress}
          onBriefProgressChange={handleBriefProgressChange}
          briefInitialAnswers={briefInitialAnswers}
          strings={strings}
          onViewPackage={handleViewPackage}
        />
      </div>
    </main>
  );
}
