"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stethoscope, Calendar, AlertTriangle } from "lucide-react";
import type { Language } from "@/lib/types";

interface PetCareSimProps {
  language: Language;
}

const SYMPTOM_RESPONSES: Record<
  Language,
  { risk: string; icd: string; plan: string; book: string }
> = {
  ru: {
    risk: "Умеренный риск",
    icd: "МКБ-10: R11.2 — Тошнота с рвотой",
    plan: "Персональный план: гипоаллергенный корм Premium Vet, 4 приёма/день, исключить жирное. Контроль через 48ч.",
    book: "Записаться к ветеринару",
  },
  en: {
    risk: "Moderate risk",
    icd: "ICD-10: R11.2 — Nausea with vomiting",
    plan: "Personal plan: hypoallergenic Premium Vet food, 4 meals/day, exclude fatty foods. Follow-up in 48h.",
    book: "Book a Veterinarian",
  },
  am: {
    risk: "Միջին ռիսկ",
    icd: "ICD-10: R11.2 — Տաժանակություն և ծգրություն",
    plan: "Անհատական պլան՝ հիպոալերգեն Premium Vet կեր, օրական 4 անգամ, բացառել ճարպային։ Վերահսկում 48 ժամից։",
    book: "Գրանցվել վետերինարին",
  },
};

export function PetCareSim({ language }: PetCareSimProps) {
  const [symptoms, setSymptoms] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const labels = SYMPTOM_RESPONSES[language];

  const ui =
    language === "ru"
      ? {
          greeting: "Привет, Алекс! Как себя чувствует Барсик?",
          symptoms: "Опишите симптомы",
          placeholder: "Рвота, вялость, отказ от еды...",
          analyze: "Анализировать",
          pet: "Барсик · British Shorthair · 3 года",
          dashboard: "PetCare AI",
          module: "Диагностический модуль",
        }
      : language === "am"
        ? {
            greeting: "Բարև, Ալեքս! Ինչպե՞ս է իրեն զգում Բարսիկը։",
            symptoms: "Նկարագրեք ախտանիշները",
            placeholder: "Փսխում, թուլություն, սննդից հրաժարում...",
            analyze: "Վերլուծել",
            pet: "Բարսիկ · British Shorthair · 3 տարեկան",
            dashboard: "PetCare AI",
            module: "Ախտորոշման մոդուլ",
          }
        : {
            greeting: "Hi Alex! How is Barsik doing?",
            symptoms: "Describe symptoms",
            placeholder: "Vomiting, lethargy, loss of appetite...",
            analyze: "Analyze",
            pet: "Barsik · British Shorthair · 3 years",
            dashboard: "PetCare AI",
            module: "Diagnostic Module",
          };

  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setAnalyzed(false);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#0a0f0d] text-white">
      <header className="shrink-0 border-b border-emerald-900/30 bg-[#0d1512] px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-700/30">
            <Heart className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-mono text-sm text-emerald-400">{ui.dashboard}</p>
            <p className="text-[11px] text-zinc-500">{ui.pet}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
        >
          <p className="text-sm text-zinc-300">{ui.greeting}</p>
        </motion.div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-emerald-500" />
            <p className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              {ui.module}
            </p>
          </div>
          <label className="block text-xs text-zinc-400">{ui.symptoms}</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={ui.placeholder}
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-700/50"
          />
          <motion.button
            onClick={handleAnalyze}
            disabled={loading || !symptoms.trim()}
            className="w-full rounded-lg bg-emerald-700 py-2.5 font-mono text-[10px] tracking-widest text-white uppercase disabled:opacity-40"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading
              ? language === "ru"
                ? "Анализ..."
                : language === "am"
                  ? "Վերլուծում..."
                  : "Analyzing..."
              : ui.analyze}
          </motion.button>
        </div>

        <AnimatePresence>
          {analyzed && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-amber-800/40 bg-amber-950/20 px-4 py-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-amber-400">{labels.risk}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{labels.icd}</p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/10 p-4">
                <p className="font-mono text-[9px] tracking-widest text-emerald-600 uppercase mb-2">
                  AI Plan
                </p>
                <p className="text-xs leading-relaxed text-zinc-300">{labels.plan}</p>
              </div>

              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 py-3 font-mono text-[10px] tracking-widest text-emerald-400 uppercase"
                whileHover={{ backgroundColor: "rgba(16,185,129,0.1)" }}
                whileTap={{ scale: 0.99 }}
              >
                <Calendar className="h-4 w-4" />
                {labels.book}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
