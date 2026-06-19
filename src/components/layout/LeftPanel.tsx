"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { projects } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface LeftPanelProps {
  language: Language;
  activeProject: ProjectId;
  strings: UIStrings;
  onLanguageChange: (lang: Language) => void;
  onProjectSelect: (id: ProjectId) => void;
}

export function LeftPanel({
  language,
  activeProject,
  strings,
  onLanguageChange,
  onProjectSelect,
}: LeftPanelProps) {
  const isArmenian = language === "am";
  const fontClass = isArmenian ? "font-armenian" : "";

  return (
    <aside className="flex h-full w-[38%] min-w-[400px] max-w-[480px] flex-col border-r border-white/[0.06]">
      <header className="px-10 pt-12 pb-10">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className={`text-[13px] leading-relaxed text-zinc-500 ${fontClass}`}>
              {strings.portfolioSubtitle}
            </p>
            <h1
              className={`font-display mt-3 text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-zinc-50 ${fontClass}`}
            >
              {strings.heroLine}
            </h1>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className={`text-[13px] text-zinc-600 ${fontClass}`}>
            {strings.availability}
          </span>
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
        </div>
      </header>

      <nav className="flex-1 overflow-y-auto px-6">
        <ul>
          {projects.map((project) => {
            const translation = strings.projects[project.id];
            const isActive = activeProject === project.id;
            const theme = getProjectTheme(project.id);

            return (
              <li key={project.id} className="border-t border-white/[0.06] last:border-b">
                <button
                  onClick={() => onProjectSelect(project.id)}
                  data-active={isActive}
                  className="project-row group w-full cursor-pointer py-5 pl-5 pr-2 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                  style={
                    {
                      "--accent": theme.accent,
                    } as React.CSSProperties
                  }
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
                      className={`hidden shrink-0 text-[12px] sm:block ${
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
      </nav>

      <footer className="px-10 py-6">
        <p className="text-[12px] tabular-nums text-zinc-700">
          0{projects.findIndex((p) => p.id === activeProject) + 1}
          <span className="mx-1.5">/</span>
          0{projects.length}
        </p>
      </footer>
    </aside>
  );
}
