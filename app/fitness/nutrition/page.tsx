"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFitness } from "../context/FitnessContext";
import { motion } from "framer-motion";
import { Apple, Flame, TrendingDown } from "lucide-react";

export default function NutritionPage() {
  const { user, getSessionsForUser } = useFitness();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  const sessions = user ? getSessionsForUser(user.id) : [];
  const stats = useMemo(() => {
    const totalBurned = sessions.reduce((acc, s) => acc + s.caloriesBurned, 0);
    const last7Days = sessions.filter((s) => {
      const d = new Date(s.date);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });
    const burnedThisWeek = last7Days.reduce((acc, s) => acc + s.caloriesBurned, 0);
    return { totalBurned, burnedThisWeek };
  }, [sessions]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Nutrition & calories</h1>
      <p className="text-wellness-brown/60 mb-8">
        Suivi des calories brûlées via vos séances. Complétez avec une app nutrition dédiée pour les apports.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
            <Flame className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-wellness-brown/60">Calories brûlées (total)</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalBurned} kcal</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
            <TrendingDown className="w-7 h-7 text-wellness-sage-muted" />
          </div>
          <div>
            <p className="text-sm text-wellness-brown/60">Cette semaine</p>
            <p className="text-2xl font-bold text-slate-800">{stats.burnedThisWeek} kcal</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Apple className="w-5 h-5 text-wellness-sage-muted" />
          Conseil bien-être
        </h2>
        <p className="text-slate-600">
          Pour un suivi nutritionnel complet, associez vos séances à un journal alimentaire (calories consommées).
          L&apos;équilibre entre dépense et apport vous aide à atteindre vos objectifs (perte de poids, prise de muscle, etc.).
        </p>
      </motion.div>
    </div>
  );
}
