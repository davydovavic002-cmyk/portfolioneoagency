"use client";

import { ArrowUpRight } from "lucide-react";
import type { Language, ProjectId } from "@/lib/types";
import type { UIStrings } from "@/lib/types";
import { getProjectPackage } from "@/lib/project-packages";

interface PackageBadgeProps {
  projectId: ProjectId;
  language: Language;
  strings: UIStrings;
  accent: string;
  onViewPackage: (projectId: ProjectId) => void;
  className?: string;
}

export function PackageBadge({
  projectId,
  language,
  strings,
  accent,
  onViewPackage,
  className = "",
}: PackageBadgeProps) {
  const pkg = getProjectPackage(projectId, language);
  if (!pkg) return null;

  return (
    <button
      type="button"
      onClick={() => onViewPackage(projectId)}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-left text-[11px] text-zinc-400 transition-colors hover:border-white/[0.14] hover:text-zinc-200 ${className}`}
    >
      <span style={{ color: accent }}>{pkg.item.name}</span>
      <span className="text-zinc-600">·</span>
      <span>{pkg.item.price}</span>
      <ArrowUpRight className="h-3 w-3 text-zinc-600 transition-colors group-hover:text-zinc-400" />
    </button>
  );
}

interface PackageStripProps {
  projectId: ProjectId;
  language: Language;
  strings: UIStrings;
  accent: string;
  onViewPackage: (projectId: ProjectId) => void;
  isMobile?: boolean;
}

export function PackageStrip({
  projectId,
  language,
  strings,
  accent,
  onViewPackage,
  isMobile = false,
}: PackageStripProps) {
  const pkg = getProjectPackage(projectId, language);
  if (!pkg) return null;

  const isArmenian = language === "am";

  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3 ${
        isMobile ? "mb-3" : "mb-4"
      }`}
    >
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
          {strings.packageLabel}
        </p>
        <p className={`mt-1 text-[13px] text-zinc-300 ${isArmenian ? "font-armenian" : ""}`}>
          <span style={{ color: accent }}>{pkg.item.name}</span>
          <span className="mx-1.5 text-zinc-600">·</span>
          <span className="text-zinc-400">{pkg.item.price}</span>
          {pkg.item.timeline && (
            <>
              <span className="mx-1.5 text-zinc-700">·</span>
              <span className="text-zinc-500">{pkg.item.timeline}</span>
            </>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onViewPackage(projectId)}
        className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.1] px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:border-white/[0.18] hover:text-zinc-200"
      >
        <span className="hidden sm:inline">{strings.viewInServices}</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
