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
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#080808]">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-safe-4 z-10 rounded-full border border-white/[0.08] px-3 py-1.5 text-[12px] text-zinc-500 transition hover:text-zinc-300"
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
