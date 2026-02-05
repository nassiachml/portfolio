"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus } from "lucide-react";

export default function GoalsPage() {
  const { user, getGoalsForUser, addGoal, updateGoalProgress } = useFitness();
  const router = useRouter();
  const [goals, setGoals] = useState(getGoalsForUser(user?.id ?? ""));
  const [showForm, setShowForm] = useState(false);
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState(5);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [unit, setUnit] = useState("kg");

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  useEffect(() => {
    if (user) setGoals(getGoalsForUser(user.id));
  }, [user, getGoalsForUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({ goal, target, currentProgress, unit });
    setShowForm(false);
    setGoal("");
    setTarget(5);
    setCurrentProgress(0);
    setUnit("kg");
    setGoals(getGoalsForUser(user!.id));
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-wellness-brown">Mes objectifs</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-wellness-brown/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvel objectif
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-wellness-sage/20 p-6 shadow-sm mb-8"
          >
            <h2 className="text-lg font-semibold text-wellness-brown mb-4">Nouvel objectif</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Objectif</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Ex. Perdre 5 kg, Courir 10 km..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-wellness-sage"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Progression actuelle</label>
                  <input
                    type="number"
                    min={0}
                    value={currentProgress}
                    onChange={(e) => setCurrentProgress(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-wellness-sage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cible</label>
                  <input
                    type="number"
                    min={1}
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-wellness-sage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unité</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-wellness-sage"
                  >
                    <option value="kg">kg</option>
                    <option value="km">km</option>
                    <option value="séances">séances</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-wellness-brown/90">
                  Créer
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200">
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="bg-white rounded-xl border border-wellness-sage/20 p-12 text-center text-wellness-brown/60">
            Aucun objectif. Définissez votre premier objectif !
          </div>
        ) : (
          goals.map((g, i) => {
            const pct = g.target > 0 ? Math.min(100, (g.currentProgress / g.target) * 100) : 0;
            const done = g.currentProgress >= g.target;
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className={`w-5 h-5 ${done ? "text-orange-500" : "text-slate-400"}`} />
                    <span className="font-semibold text-wellness-brown">{g.goal}</span>
                    {done && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Atteint</span>}
                  </div>
                  <span className="text-sm text-wellness-brown/60">{g.currentProgress} / {g.target} {g.unit}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${done ? "bg-orange-500" : "bg-wellness-sage/80"}`}
                  />
                </div>
                {!done && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      min={g.currentProgress}
                      max={g.target}
                      defaultValue={g.currentProgress}
                      className="w-20 px-2 py-1 text-sm rounded border border-slate-200"
                      onBlur={(e) => {
                        const v = Number(e.target.value);
                        if (!Number.isNaN(v)) updateGoalProgress(g.id, Math.min(g.target, Math.max(0, v)));
                        setGoals(getGoalsForUser(user.id));
                      }}
                    />
                    <span className="text-xs text-wellness-brown/60 self-center">Mettre à jour la progression</span>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
