"use client";

import { useEffect, useState } from "react";

const HEADER_OFFSET = 76;

export function useScrollSpy(sectionIds: string[], rootSelector = ".site-main") {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.12, 0.28, 0.45],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [rootSelector, sectionIds]);

  return activeSection;
}

export function scrollToSection(id: string) {
  const root = document.querySelector<HTMLElement>(".site-main");
  const element = document.getElementById(id);
  if (!element) return;

  const scrollTarget = () => {
    if (root) {
      const rootRect = root.getBoundingClientRect();
      const elRect = element.getBoundingClientRect();
      const nextTop = root.scrollTop + (elRect.top - rootRect.top) - HEADER_OFFSET;
      root.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  requestAnimationFrame(scrollTarget);
}

export function scrollToTop() {
  const root = document.querySelector<HTMLElement>(".site-main");
  if (root) {
    root.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
