"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Language, ProjectId } from "@/lib/types";
import { isDesktopSiteProject } from "@/lib/types";
import { getProjectMeta } from "@/lib/projects";
import { dictionary } from "@/lib/i18n/dictionary";
import { DeviceFrame } from "./DeviceFrame";
import { DesktopSitePreview } from "./DesktopSitePreview";
import { NeuroShporaSim } from "@/components/projects/NeuroShporaSim";
import { BlessedAngelSim } from "@/components/projects/BlessedAngelSim";
import { JewelryStoreSim } from "@/components/projects/JewelryStoreSim";
import { PetCareSim } from "@/components/projects/PetCareSim";

interface SimulatorViewProps {
  activeProject: ProjectId;
  language: Language;
}

function ProjectMock({
  projectId,
  language,
}: {
  projectId: ProjectId;
  language: Language;
}) {
  switch (projectId) {
    case "neuro-shpora":
      return <NeuroShporaSim language={language} />;
    case "blessed-angel":
      return <BlessedAngelSim language={language} />;
    case "jewelry-store":
      return <JewelryStoreSim language={language} />;
    case "petcare-ai":
      return <PetCareSim language={language} />;
    default:
      return null;
  }
}

export function SimulatorView({ activeProject, language }: SimulatorViewProps) {
  const meta = getProjectMeta(activeProject);
  const isDesktopSite = isDesktopSiteProject(meta);
  const title = dictionary[language].projects[activeProject].title;

  const content = isDesktopSite ? (
    <DesktopSitePreview previewUrl={meta.previewUrl} title={title} language={language}>
      <ProjectMock projectId={activeProject} language={language} />
    </DesktopSitePreview>
  ) : (
    <ProjectMock projectId={activeProject} language={language} />
  );

  return (
    <DeviceFrame device={meta.device} projectId={activeProject}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </DeviceFrame>
  );
}
