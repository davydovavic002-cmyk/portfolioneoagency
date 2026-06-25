"use client";

import { useEffect, useState } from "react";
import type { Language, ProjectId, ViewMode } from "@/lib/types";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { MobileContentHeader } from "@/components/layout/MobileContentHeader";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ServiceTierId } from "@/lib/types";
import type { AboutSectionId } from "@/lib/i18n/about";
import {
  getProjectPackage,
  serviceItemElementId,
  type ServiceItemId,
} from "@/lib/project-packages";

export default function Home() {
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");
  const [viewMode, setViewMode] = useState<ViewMode>("work");
  const [activeTier, setActiveTier] = useState<ServiceTierId | null>(null);
  const [activeServiceItem, setActiveServiceItem] = useState<ServiceItemId | null>(null);
  const [activeAboutSection, setActiveAboutSection] = useState<AboutSectionId | null>(
    null,
  );
  const [mobileShowContent, setMobileShowContent] = useState(false);

  const strings = dictionary[language];

  useEffect(() => {
    if (!isMobile) setMobileShowContent(false);
  }, [isMobile]);

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
    if (mode === "work") {
      setActiveTier(null);
      setActiveServiceItem(null);
      setActiveAboutSection(null);
      if (isMobile) setMobileShowContent(false);
    }
    if (mode === "services") {
      setActiveAboutSection(null);
      if (isMobile) setMobileShowContent(true);
    }
    if (mode === "about") {
      setActiveTier(null);
      setActiveServiceItem(null);
      if (isMobile) setMobileShowContent(true);
    }
    if (isMobile && (mode === "services" || mode === "about")) {
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
    if (isMobile) setMobileShowContent(true);
  };

  const handleTierSelect = (tierId: ServiceTierId) => {
    setViewMode("services");
    setActiveTier(tierId);
    setActiveServiceItem(null);
    setActiveAboutSection(null);
    if (isMobile) setMobileShowContent(true);
    requestAnimationFrame(() => {
      document.getElementById(`tier-${tierId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleAboutSectionSelect = (sectionId: AboutSectionId) => {
    setViewMode("about");
    setActiveTier(null);
    setActiveServiceItem(null);
    setActiveAboutSection(sectionId);
    if (isMobile) setMobileShowContent(true);
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
    if (isMobile) setMobileShowContent(true);
    scrollToServiceItem(pkg.itemId, pkg.tierId);
  };

  const showNav = !isMobile || !mobileShowContent;
  const showContent = !isMobile || mobileShowContent;

  return (
    <main
      className={`flex h-dvh w-screen flex-col overflow-hidden bg-[#080808] lg:flex-row ${
        language === "am" ? "font-armenian" : ""
      }`}
    >
      {showNav && (
        <div className="flex min-h-0 flex-1 flex-col lg:h-full lg:min-w-[400px] lg:max-w-[480px] lg:flex-none lg:w-[38%]">
          <LeftPanel
            language={language}
            activeProject={activeProject}
            viewMode={viewMode}
            activeTier={activeTier}
            activeAboutSection={activeAboutSection}
            strings={strings}
            onLanguageChange={setLanguage}
            onProjectSelect={handleProjectSelect}
            onViewChange={handleViewChange}
            onTierSelect={handleTierSelect}
            onAboutSectionSelect={handleAboutSectionSelect}
            onViewPackage={handleViewPackage}
          />
        </div>
      )}

      {showContent && (
        <div className="flex min-h-0 flex-1 flex-col lg:h-full">
          {isMobile && mobileShowContent && (
            <MobileContentHeader
              strings={strings}
              language={language}
              viewMode={viewMode}
              backLabel={strings.backToMenu}
              onBack={() => setMobileShowContent(false)}
              onViewChange={handleViewChange}
              onLanguageChange={setLanguage}
            />
          )}
          <RightPanel
            language={language}
            activeProject={activeProject}
            viewMode={viewMode}
            activeTier={activeTier}
            activeServiceItem={activeServiceItem}
            activeAboutSection={activeAboutSection}
            strings={strings}
            isMobile={isMobile}
            onViewPackage={handleViewPackage}
          />
        </div>
      )}
    </main>
  );
}
