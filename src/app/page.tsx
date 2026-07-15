"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language, ProjectId, ServiceTierId } from "@/lib/types";
import { SITE_CONFIG } from "@/config/site";
import { dictionary } from "@/lib/i18n/dictionary";
import { defaultProjectId } from "@/lib/projects";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingBriefCta } from "@/components/layout/FloatingBriefCta";
import { MonicaHero } from "@/components/home/MonicaHero";
import { ContentsPanel } from "@/components/home/ContentsPanel";
import { StackMarquee } from "@/components/home/StackMarquee";
import { PartDivider } from "@/components/home/PartDivider";
import { WorkSection } from "@/components/work/WorkSection";
import { SectionShell } from "@/components/layout/SectionShell";
import { BriefView, INITIAL_BRIEF_PROGRESS, type BriefProgress } from "@/components/brief/BriefView";
import { PricingView } from "@/components/pricing/PricingView";
import { AboutView } from "@/components/about/AboutView";
import type { AboutSectionId } from "@/lib/i18n/about";
import type { BriefAnswers, BriefProjectType } from "@/lib/brief/types";
import {
  getProjectPackage,
  serviceItemElementId,
  type ServiceItemId,
} from "@/lib/project-packages";
import { SITE_SECTIONS } from "@/lib/site-sections";
import { scrollToSection, useScrollSpy } from "@/lib/scroll-spy";
import { servicesByLanguage } from "@/lib/i18n/services";
import { aboutByLanguage } from "@/lib/i18n/about";

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

function scrollInMain(element: HTMLElement | null, block: ScrollLogicalPosition = "start") {
  const root = document.querySelector<HTMLElement>(".site-main");
  if (!element) return;
  if (!root) {
    element.scrollIntoView({ behavior: "smooth", block });
    return;
  }
  const offset = block === "center" ? root.clientHeight / 2 - element.clientHeight / 2 : 76;
  const rootRect = root.getBoundingClientRect();
  const elRect = element.getBoundingClientRect();
  const nextTop = root.scrollTop + (elRect.top - rootRect.top) - offset;
  root.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
}

function scrollToServiceItem(itemId: ServiceItemId, tierId: ServiceTierId) {
  requestAnimationFrame(() => {
    scrollInMain(document.getElementById(serviceItemElementId(itemId)), "center");
    scrollInMain(document.getElementById(`tier-${tierId}`), "nearest");
  });
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>(defaultProjectId);
  const [language, setLanguage] = useState<Language>("en");
  const [activeTier, setActiveTier] = useState<ServiceTierId | null>(null);
  const [activeServiceItem, setActiveServiceItem] = useState<ServiceItemId | null>(null);
  const [activeAboutSection, setActiveAboutSection] = useState<AboutSectionId | null>(null);
  const [briefProgress, setBriefProgress] = useState<BriefProgress>(INITIAL_BRIEF_PROGRESS);
  const [briefInitialAnswers, setBriefInitialAnswers] = useState<
    Partial<BriefAnswers> | undefined
  >();

  const strings = dictionary[language];
  const servicesCopy = servicesByLanguage[language];
  const aboutCopy = aboutByLanguage[language];
  const activeSection = useScrollSpy([...SITE_SECTIONS]);

  const handleBriefProgressChange = useCallback((progress: BriefProgress) => {
    setBriefProgress(progress);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("brief") === "1") {
      requestAnimationFrame(() => scrollToSection("brief"));
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

  const handleProjectSelect = (id: ProjectId) => {
    setActiveProject(id);
    if (window.innerWidth < 1280) {
      requestAnimationFrame(() => {
        scrollInMain(document.getElementById("work-preview"), "start");
      });
    }
  };

  const handleViewPackage = (projectId: ProjectId = activeProject) => {
    const pkg = getProjectPackage(projectId, language);
    if (!pkg) return;

    setActiveTier(pkg.tierId);
    setActiveServiceItem(pkg.itemId);
    scrollToSection("services");
    scrollToServiceItem(pkg.itemId, pkg.tierId);
  };

  return (
    <div className={`site-shell relative flex h-dvh flex-col overflow-hidden bg-canvas ${language === "am" ? "font-armenian" : ""}`}>
      <SiteHeader
        language={language}
        activeSection={activeSection}
        strings={strings}
        onLanguageChange={setLanguage}
      />

      <main className="site-main relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-0 lg:pb-0">
        <MonicaHero language={language} strings={strings} />
        <ContentsPanel language={language} strings={strings} activeSection={activeSection} />
        <StackMarquee />
        <PartDivider part="Part 01" title={strings.navWork} meta="2024–2026" />

        <WorkSection
          language={language}
          strings={strings}
          activeProject={activeProject}
          onProjectSelect={handleProjectSelect}
          onViewPackage={handleViewPackage}
        />

        <PartDivider part="Part 02" title={strings.navServices} meta={SITE_CONFIG.brandName} />

        <SectionShell
          id="services"
          label={strings.navServices}
          title={servicesCopy.heroTitle}
          subtitle={servicesCopy.heroSubtitle}
        >
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border-2 border-pink/20 bg-pink/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[14px] leading-relaxed text-muted">{strings.servicesCtaBrief}</p>
            <button type="button" onClick={() => scrollToSection("brief")} className="btn-pink shrink-0">
              {strings.heroCtaBrief}
            </button>
          </div>
          <PricingView
            language={language}
            scrollToTier={activeTier}
            scrollToServiceItem={activeServiceItem}
            embedded
          />
        </SectionShell>

        <PartDivider part="Part 03" title={strings.navBrief} />

        <SectionShell
          id="brief"
          label={strings.navBrief}
          title={strings.briefHeroTitle}
          subtitle={strings.briefHeroSubtitle}
          className="!pb-0"
        >
          <div className="preview-shell min-h-[560px] overflow-hidden">
            <BriefView
              progress={briefProgress}
              onProgressChange={handleBriefProgressChange}
              initialAnswers={briefInitialAnswers}
            />
          </div>
        </SectionShell>

        <SectionShell
          id="about"
          label={strings.navAbout}
          title={aboutCopy.heroTitle}
          subtitle={aboutCopy.heroSubtitle}
        >
          <AboutView language={language} scrollToSection={activeAboutSection} embedded />
        </SectionShell>

        <SiteFooter language={language} strings={strings} />
      </main>

      <MobileBottomNav activeSection={activeSection} strings={strings} />
      <FloatingBriefCta
        visible={activeSection === "work" || activeSection === "services"}
        strings={strings}
      />
    </div>
  );
}
