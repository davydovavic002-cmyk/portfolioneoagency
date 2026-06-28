"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { briefCopy } from "@/lib/brief/copy";
import {
  buildTelegramBriefMessage,
  buildTelegramUrl,
  getBriefRecommendation,
  getServiceItemById,
} from "@/lib/brief/matching";
import {
  INITIAL_BRIEF_ANSWERS,
  type BriefAnswers,
  type BriefBudget,
  type BriefIndustry,
  type BriefProjectType,
  type BriefTimeline,
} from "@/lib/brief/types";
import { dictionary } from "@/lib/i18n/dictionary";

export const BRIEF_TOTAL_STEPS = 4;

export type BriefStepKey = "projectType" | "industry" | "budget" | "timeline";

export const BRIEF_STEP_ORDER: BriefStepKey[] = [
  "projectType",
  "industry",
  "budget",
  "timeline",
];

export interface BriefProgress {
  step: number;
  showResult: boolean;
  answers: BriefAnswers;
}

export const INITIAL_BRIEF_PROGRESS: BriefProgress = {
  step: 0,
  showResult: false,
  answers: INITIAL_BRIEF_ANSWERS,
};

interface BriefViewProps {
  progress: BriefProgress;
  onProgressChange: (progress: BriefProgress) => void;
  initialAnswers?: Partial<BriefAnswers>;
}

export function BriefView({ progress, onProgressChange, initialAnswers }: BriefViewProps) {
  const { step, showResult, answers } = progress;

  const prefillApplied = useRef(false);

  useEffect(() => {
    if (!initialAnswers || prefillApplied.current) return;
    prefillApplied.current = true;
    onProgressChange({
      ...INITIAL_BRIEF_PROGRESS,
      answers: { ...INITIAL_BRIEF_ANSWERS, ...initialAnswers },
    });
  }, [initialAnswers, onProgressChange]);

  const currentKey = BRIEF_STEP_ORDER[step];
  const recommendation = showResult ? getBriefRecommendation(answers) : null;
  const service = recommendation
    ? getServiceItemById(recommendation.serviceItemId)
    : null;
  const caseStudy = recommendation
    ? dictionary.en.projects[recommendation.projectId]
    : null;

  const canContinue = answers[currentKey] !== null;
  const telegramUrl = buildTelegramUrl(buildTelegramBriefMessage(answers));

  const setAnswers = (next: BriefAnswers) => {
    onProgressChange({ ...progress, answers: next });
  };

  const handleSelect = <K extends BriefStepKey>(key: K, value: BriefAnswers[K]) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleNext = () => {
    if (step < BRIEF_TOTAL_STEPS - 1) {
      onProgressChange({ ...progress, step: step + 1 });
      return;
    }
    onProgressChange({ ...progress, showResult: true });
  };

  const handleBack = () => {
    if (showResult) {
      onProgressChange({ ...progress, showResult: false });
      return;
    }
    if (step > 0) onProgressChange({ ...progress, step: step - 1 });
  };

  const handleRestart = () => {
    onProgressChange(INITIAL_BRIEF_PROGRESS);
  };

  const stepLabel = showResult
    ? briefCopy.resultTitle
    : briefCopy.step(step + 1, BRIEF_TOTAL_STEPS);

  const headline = showResult
    ? briefCopy.resultSubtitle
    : getStepHeadline(currentKey);

  return (
    <section className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#080808]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_60%_-5%,rgba(96,165,250,0.14)_0%,transparent_55%),radial-gradient(ellipse_70%_60%_at_10%_100%,rgba(167,139,250,0.1)_0%,transparent_50%)]" />

      <div className="preview-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div
          className={`mx-auto flex w-full max-w-2xl min-h-full flex-1 flex-col px-5 lg:px-10 ${
            showResult ? "py-8 pb-10 lg:py-12 lg:pb-16" : "py-6 pb-10 lg:py-10 lg:pb-14"
          }`}
        >
          <div
            className={`flex flex-1 flex-col ${showResult ? "" : "justify-center"}`}
          >
            {!showResult && (
              <div className="mb-6 shrink-0 lg:mb-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                    {stepLabel}
                  </p>
                  <p className="text-[11px] tabular-nums text-zinc-600">
                    {Math.round(((step + (canContinue ? 0.35 : 0)) / BRIEF_TOTAL_STEPS) * 100)}%
                  </p>
                </div>
                <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400/80 to-violet-400/80"
                    animate={{
                      width: `${((step + (canContinue ? 1 : 0.25)) / BRIEF_TOTAL_STEPS) * 100}%`,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={showResult ? "result" : currentKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                  {showResult ? briefCopy.resultTitle : briefCopy.title}
                </p>
                <h2 className="font-display mt-3 text-[1.75rem] leading-[1.08] tracking-[-0.03em] text-zinc-50 lg:text-[2.35rem]">
                  {headline}
                </h2>
                {!showResult && step === 0 && (
                  <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-500">
                    {briefCopy.subtitle}
                  </p>
                )}

                <div className="mt-8">
                  {showResult && recommendation && service && caseStudy ? (
                  <div className="space-y-5">
                    <p className="text-[14px] leading-relaxed text-zinc-400">
                      {recommendation.rationale}
                    </p>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                          {briefCopy.caseStudy}
                        </p>
                        <p className="font-display mt-3 text-xl text-zinc-50">
                          {caseStudy.title}
                        </p>
                        <p className="mt-2 text-[12px] text-zinc-500">{caseStudy.category}</p>
                        <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                          {caseStudy.description}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-5 backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          {briefCopy.recommendedPackage}
                        </p>
                        <div className="mt-3 flex items-start justify-between gap-3">
                          <p className="font-display text-xl text-zinc-50">{service.name}</p>
                          <p className="shrink-0 font-display text-2xl text-blue-300">
                            {service.price}
                          </p>
                        </div>
                        {service.timeline && (
                          <p className="mt-2 text-[11px] uppercase tracking-widest text-zinc-600">
                            {briefCopy.timelineLabel}: {service.timeline}
                          </p>
                        )}
                        <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <label className="block">
                      <span className="text-[12px] text-zinc-500">{briefCopy.notesLabel}</span>
                      <textarea
                        value={answers.notes}
                        onChange={(event) =>
                          setAnswers({ ...answers, notes: event.target.value })
                        }
                        placeholder={briefCopy.notesPlaceholder}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-[13px] text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-white/[0.16]"
                      />
                    </label>
                  </div>
                  ) : (
                    <OptionGrid
                      stepKey={currentKey}
                      value={answers[currentKey]}
                      onSelect={handleSelect}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer className="relative shrink-0 border-t border-white/[0.06] px-5 pt-5 pb-safe-8 lg:px-10 lg:pt-6 lg:pb-safe-10">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={!showResult && step === 0}
            className="rounded-full px-4 py-2.5 text-[12px] text-zinc-500 transition enabled:hover:text-zinc-300 disabled:opacity-30"
          >
            {briefCopy.back}
          </button>

          {showResult ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-full border border-white/[0.08] px-4 py-2.5 text-[12px] text-zinc-500 transition hover:border-white/[0.14] hover:text-zinc-300"
              >
                {briefCopy.restart}
              </button>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white px-5 py-2.5 text-[12px] font-medium text-black transition hover:bg-zinc-100"
              >
                {briefCopy.sendBrief}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="rounded-full border border-white/[0.14] bg-white px-5 py-2.5 text-[12px] font-medium text-black transition enabled:hover:bg-zinc-100 disabled:opacity-40"
            >
              {step === BRIEF_TOTAL_STEPS - 1 ? briefCopy.finish : briefCopy.next}
            </button>
          )}
        </div>
      </footer>
    </section>
  );
}

function getStepHeadline(stepKey: BriefStepKey): string {
  const labels: Record<BriefStepKey, string> = {
    projectType: briefCopy.projectType.label,
    industry: briefCopy.industry.label,
    budget: briefCopy.budget.label,
    timeline: briefCopy.timeline.label,
  };
  return labels[stepKey];
}

interface OptionGridProps {
  stepKey: BriefStepKey;
  value: BriefAnswers[BriefStepKey];
  onSelect: <K extends BriefStepKey>(key: K, value: BriefAnswers[K]) => void;
}

function OptionGrid({ stepKey, value, onSelect }: OptionGridProps) {
  if (stepKey === "projectType") {
    const options = briefCopy.projectType.options;
    return (
      <div className="grid gap-2.5 sm:grid-cols-2">
        {(Object.keys(options) as BriefProjectType[]).map((key) => (
          <OptionCard
            key={key}
            selected={value === key}
            label={options[key].label}
            description={options[key].description}
            onClick={() => onSelect("projectType", key)}
          />
        ))}
      </div>
    );
  }

  if (stepKey === "industry") {
    const options = briefCopy.industry.options;
    return (
      <div className="grid gap-2.5 sm:grid-cols-2">
        {(Object.keys(options) as BriefIndustry[]).map((key) => (
          <OptionCard
            key={key}
            selected={value === key}
            label={options[key].label}
            description={options[key].description}
            onClick={() => onSelect("industry", key)}
          />
        ))}
      </div>
    );
  }

  if (stepKey === "budget") {
    const options = briefCopy.budget.options;
    return (
      <div className="grid gap-2.5">
        {(Object.keys(options) as BriefBudget[]).map((key) => (
          <OptionCard
            key={key}
            selected={value === key}
            label={options[key].label}
            description={options[key].description}
            onClick={() => onSelect("budget", key)}
            compact
          />
        ))}
      </div>
    );
  }

  const options = briefCopy.timeline.options;
  return (
    <div className="grid gap-2.5 sm:grid-cols-3">
      {(Object.keys(options) as BriefTimeline[]).map((key) => (
        <OptionCard
          key={key}
          selected={value === key}
          label={options[key].label}
          description={options[key].description}
          onClick={() => onSelect("timeline", key)}
        />
      ))}
    </div>
  );
}

interface OptionCardProps {
  selected: boolean;
  label: string;
  description: string;
  onClick: () => void;
  compact?: boolean;
}

function OptionCard({ selected, label, description, onClick, compact }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border text-left transition duration-300 ${
        compact ? "px-4 py-3.5" : "px-4 py-4"
      } ${
        selected
          ? "border-blue-400/50 bg-blue-500/[0.12] shadow-[0_0_0_1px_rgba(96,165,250,0.15)]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05]"
      }`}
    >
      <p className="text-[13px] font-medium text-zinc-100">{label}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500 group-hover:text-zinc-400">
        {description}
      </p>
    </button>
  );
}
