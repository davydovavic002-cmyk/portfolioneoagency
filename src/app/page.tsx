"use client";

import { useState } from "react";
import type { Language, ProjectId, ViewMode } from "@/lib/types";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import type { ServiceTierId } from "@/lib/types";
import type { AboutSectionId } from "@/lib/i18n/about";

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");
  const [viewMode, setViewMode] = useState<ViewMode>("work");
  const [activeTier, setActiveTier] = useState<ServiceTierId | null>(null);
  const [activeAboutSection, setActiveAboutSection] = useState<AboutSectionId | null>(
    null,
  );

  const strings = dictionary[language];

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "work") {
      setActiveTier(null);
      setActiveAboutSection(null);
    }
    if (mode === "services") setActiveAboutSection(null);
    if (mode === "about") setActiveTier(null);
  };

  const handleProjectSelect = (id: ProjectId) => {
    setActiveProject(id);
    setViewMode("work");
    setActiveTier(null);
    setActiveAboutSection(null);
  };

  const handleTierSelect = (tierId: ServiceTierId) => {
    setViewMode("services");
    setActiveTier(tierId);
    setActiveAboutSection(null);
    requestAnimationFrame(() => {
      document.getElementById(`tier-${tierId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleAboutSectionSelect = (sectionId: AboutSectionId) => {
    setViewMode("about");
    setActiveTier(null);
    setActiveAboutSection(sectionId);
    requestAnimationFrame(() => {
      document.getElementById(`about-${sectionId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <main
      className={`flex h-screen w-screen overflow-hidden bg-[#080808] ${
        language === "am" ? "font-armenian" : ""
      }`}
    >
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
      />
      <RightPanel
        language={language}
        activeProject={activeProject}
        viewMode={viewMode}
        activeTier={activeTier}
        activeAboutSection={activeAboutSection}
        strings={strings}
      />
    </main>
  );
}
