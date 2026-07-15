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
      className={`group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-black/12 bg-accent-soft px-3 py-2 text-left text-[11px] text-muted transition-colors hover:border-black/15 hover:text-ink ${className}`}
    >
      <span style={{ color: accent }}>{pkg.item.name}</span>
      <span className="text-faint">·</span>
      <span>{pkg.item.price}</span>
      <ArrowUpRight className="h-3 w-3 text-faint transition-colors group-hover:text-muted" />
    </button>
  );
}

interface PackageStripProps {
  projectId: ProjectId;
  language: Language;
  strings: UIStrings;
  accent: string;
  onViewPackage: (projectId: ProjectId) => void;
  mobile?: boolean;
  inline?: boolean;
}

export function PackageStrip({
  projectId,
  language,
  strings,
  accent,
  onViewPackage,
  mobile = false,
  inline = false,
}: PackageStripProps) {
  const pkg = getProjectPackage(projectId, language);
  if (!pkg) return null;

  const isArmenian = language === "am";

  if (inline) {
    return (
      <button
        type="button"
        onClick={() => onViewPackage(projectId)}
        className="group flex shrink-0 items-center gap-2 text-left"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
          {strings.packageLabel}
        </span>
        <span className={`text-[13px] text-muted ${isArmenian ? "font-armenian" : ""}`}>
          <span style={{ color: accent }}>{pkg.item.name}</span>
          <span className="mx-1.5 text-faint">·</span>
          <span className="text-muted">{pkg.item.price}</span>
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-muted" />
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-black/10 pb-2.5 ${
        mobile ? "mb-2" : "mb-4"
      }`}
    >
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
          {strings.packageLabel}
        </p>
        <p className={`mt-1 text-[13px] text-muted ${isArmenian ? "font-armenian" : ""}`}>
          <span style={{ color: accent }}>{pkg.item.name}</span>
          <span className="mx-1.5 text-faint">·</span>
          <span className="text-muted">{pkg.item.price}</span>
          {pkg.item.timeline && (
            <>
              <span className="mx-1.5 text-faint">·</span>
              <span className="text-muted">{pkg.item.timeline}</span>
            </>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onViewPackage(projectId)}
        className="flex shrink-0 items-center gap-1 rounded-full border border-black/12 px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-black/20 hover:text-ink"
      >
        <span className="hidden sm:inline">{strings.viewInServices}</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
