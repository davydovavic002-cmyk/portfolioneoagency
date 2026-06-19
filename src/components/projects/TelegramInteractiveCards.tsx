"use client";

import { motion } from "framer-motion";
import type { ExpressTestQuestion } from "@/lib/i18n/neuro-shpora-chat";

interface ExpressTestCardProps {
  questions: ExpressTestQuestion[];
  progressLabel: string;
  questionIndex: number;
  onAnswer: (pick: "a" | "b") => void;
  disabled?: boolean;
}

export function ExpressTestCard({
  questions,
  progressLabel,
  questionIndex,
  onAnswer,
  disabled,
}: ExpressTestCardProps) {
  const q = questions[questionIndex];
  if (!q) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-2 rounded-lg border border-[#2b5278]/40 bg-[#0e1621]/60 p-2"
    >
      <p className="text-[11px] text-[#6ab2f2]">
        {progressLabel.replace("{n}", String(questionIndex + 1))}
      </p>
      <p className="text-[12px] leading-snug text-[#e8eef4]">{q.text}</p>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onAnswer("a")}
          className="rounded-md bg-[#2b5278] px-2 py-1.5 text-[11px] text-white hover:bg-[#3468a3] disabled:opacity-40"
        >
          {q.optionA}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onAnswer("b")}
          className="rounded-md bg-[#2b5278] px-2 py-1.5 text-[11px] text-white hover:bg-[#3468a3] disabled:opacity-40"
        >
          {q.optionB}
        </button>
      </div>
    </motion.div>
  );
}

interface GeneratingCardProps {
  label: string;
  doneLabel: string;
}

export function GeneratingCard({ label, doneLabel }: GeneratingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-2 space-y-2 rounded-lg border border-[#2b5278]/30 bg-[#0e1621]/60 p-2"
    >
      <p className="text-[11px] text-[#8b9db3]">{label}</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#1c2a3a]">
        <motion.div
          className="h-full rounded-full bg-[#6ab2f2]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <p className="text-[10px] text-[#6ab2f2]">{doneLabel}</p>
    </motion.div>
  );
}

interface ProgressCardProps {
  topics: { label: string; value: number }[];
}

export function ProgressCard({ topics }: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 space-y-2 rounded-lg border border-[#2b5278]/30 bg-[#0e1621]/60 p-2"
    >
      {topics.map((bar) => (
        <div key={bar.label}>
          <div className="mb-1 flex justify-between text-[10px] text-[#8b9db3]">
            <span>{bar.label}</span>
            <span>{bar.value}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#1c2a3a]">
            <motion.div
              className="h-full rounded-full bg-[#6ab2f2]"
              initial={{ width: 0 }}
              animate={{ width: `${bar.value}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
