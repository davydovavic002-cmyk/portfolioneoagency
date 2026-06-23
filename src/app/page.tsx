"use client";

import { useState } from "react";
import type { Language, ProjectId, ViewMode } from "@/lib/types";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import type { ServiceTierId } from "@/lib/types";

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");
  const [viewMode, setViewMode] = useState<ViewMode>("work");
  const [activeTier, setActiveTier] = useState<ServiceTierId | null>(null);

  const strings = dictionary[language];

  const handleProjectSelect = (id: ProjectId) => {
    setActiveProject(id);
    setViewMode("work");
    setActiveTier(null);
  };

  const handleTierSelect = (tierId: ServiceTierId) => {
    setViewMode("services");
    setActiveTier(tierId);
    requestAnimationFrame(() => {
      document.getElementById(`tier-${tierId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleShowAllServices = () => {
    setViewMode("services");
    setActiveTier(null);
    requestAnimationFrame(() => {
      document.getElementById("pricing-top")?.scrollIntoView({ behavior: "smooth" });
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
        strings={strings}
        onLanguageChange={setLanguage}
        onProjectSelect={handleProjectSelect}
        onTierSelect={handleTierSelect}
        onShowAllServices={handleShowAllServices}
      />
      <RightPanel
        language={language}
        activeProject={activeProject}
        viewMode={viewMode}
        activeTier={activeTier}
        strings={strings}
      />
    </main>
  );
}
