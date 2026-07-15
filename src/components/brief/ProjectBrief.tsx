"use client";

import { useCallback, useState } from "react";
import type { BriefAnswers } from "@/lib/brief/types";
import {
  BriefView,
  INITIAL_BRIEF_PROGRESS,
  type BriefProgress,
} from "./BriefView";

interface ProjectBriefProps {
  open: boolean;
  onClose: () => void;
  initialAnswers?: Partial<BriefAnswers>;
}

/** Modal wrapper — used on SEO service pages only */
export function ProjectBrief({ open, onClose, initialAnswers }: ProjectBriefProps) {
  const [progress, setProgress] = useState<BriefProgress>(INITIAL_BRIEF_PROGRESS);

  const handleProgressChange = useCallback((next: BriefProgress) => {
    setProgress(next);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-canvas">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-safe-4 z-10 rounded-full border border-black/12 bg-paper px-3 py-1.5 text-[12px] text-muted transition hover:text-ink"
      >
        Close
      </button>
      <BriefView
        progress={progress}
        onProgressChange={handleProgressChange}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}
