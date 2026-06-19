"use client";

import { useState } from "react";
import type { Language, ProjectId } from "@/lib/types";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");

  const strings = dictionary[language];

  return (
    <main
      className={`flex h-screen w-screen overflow-hidden bg-[#080808] ${
        language === "am" ? "font-armenian" : ""
      }`}
    >
      <LeftPanel
        language={language}
        activeProject={activeProject}
        strings={strings}
        onLanguageChange={setLanguage}
        onProjectSelect={setActiveProject}
      />
      <RightPanel
        language={language}
        activeProject={activeProject}
        strings={strings}
      />
    </main>
  );
}
