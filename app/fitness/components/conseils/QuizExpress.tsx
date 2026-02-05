"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { UserStats } from "../../conseils/hooks/useUserStats";

const QUESTIONS = [
  {
    id: "hydratation",
    question: "Quel est le meilleur moment pour s'hydrater ?",
    options: [
      "Uniquement pendant l'effort",
      "Avant, pendant et après l'effort",
      "Seulement après l'effort",
    ],
    correct: 1,
  },
  {
    id: "recovery",
    question: "Après une séance, que privilégier pour bien récupérer ?",
    options: [
      "Protéines + glucides",
      "Uniquement des glucides",
      "Sauter le repas",
    ],
    correct: 0,
  },
  {
    id: "regularity",
    question: "Qu'est-ce qui compte le plus sur le long terme ?",
    options: [
      "La perfection de chaque séance",
      "La régularité",
      "L'intensité maximale à chaque fois",
    ],
    correct: 1,
  },
];

interface QuizExpressProps {
  stats: UserStats | null;
}

export default function QuizExpress({ stats }: QuizExpressProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleAnswer = (choice: number) => {
    const next = [...answers, choice];
    setAnswers(next);
    if (isLast) {
      setShowResult(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const score = answers.reduce(
    (acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0),
    0
  );
  const maxScore = QUESTIONS.length;

  const getFeedback = () => {
    const pct = (score / maxScore) * 100;
    if (stats) {
      if (pct === 100)
        return `Parfait ${stats.userName} ! Tu maîtrises les bases. Cette semaine tu as brûlé ${stats.weeklyCalories} kcal — continue comme ça.`;
      if (pct >= 66)
        return `Bien joué ! Tu es sur la bonne voie. ${stats.sessionsThisWeek} séance(s) cette semaine, chaque effort compte.`;
    }
    if (pct >= 66) return "Bien joué ! Tu as les bonnes bases.";
    return "Quelques révisions et tu seras au top. Relis nos articles nutrition & motivation.";
  };

  if (showResult) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-2xl bg-wellness-off-white border border-wellness-sage/20 p-6 sm:p-8"
      >
        <h3 className="font-serif text-lg font-medium text-wellness-brown mb-4 tracking-tight">Résultat</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-serif text-2xl font-medium text-wellness-sage-muted">
            {score}/{maxScore}
          </span>
          <span className="text-wellness-brown/50 text-sm">bonnes réponses</span>
        </div>
        <p className="text-wellness-brown/80 text-sm leading-relaxed">{getFeedback()}</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-2xl bg-wellness-off-white border border-wellness-sage/20 p-6 sm:p-8"
    >
      <h3 className="font-serif text-lg font-medium text-wellness-brown mb-2 tracking-tight">Quiz express</h3>
      <p className="text-wellness-brown/50 text-sm mb-6">
        {step + 1} / {QUESTIONS.length}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          <p className="font-medium text-wellness-brown/90 leading-relaxed">{current.question}</p>
          <div className="flex flex-col gap-3">
            {current.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAnswer(i)}
                className="w-full text-left px-5 py-3.5 rounded-xl border border-wellness-sage/25 text-wellness-brown/80 hover:bg-wellness-sage/10 hover:border-wellness-sage/40 transition-colors duration-300"
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
