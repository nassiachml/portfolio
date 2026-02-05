"use client";

import { useFitness } from "../context/FitnessContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Target,
  Clock,
  TrendingUp,
  Scale,
} from "lucide-react";
import DashboardCharts from "../components/DashboardCharts";

function bmi(weight: number, height: number): number {
  const h = height / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

export default function DashboardPage() {
  const { user, getSessionsForUser, getGoalsForUser } = useFitness();
  const router = useRouter();
  const sessions = user ? getSessionsForUser(user.id) : [];
  const goals = user ? getGoalsForUser(user.id) : [];

  useEffect(() => {
    if (!user) {
      router.replace("/fitness/login");
    }
  }, [user, router]);

  const stats = useMemo(() => {
    const totalCalories = sessions.reduce((acc, s) => acc + s.caloriesBurned, 0);
    const totalDuration = sessions.reduce((acc, s) => acc + s.duration, 0);
    const goalsReached = goals.filter((g) => g.currentProgress >= g.target).length;
    const imc = user ? bmi(user.weight, user.height) : 0;
    return {
      sessionsCount: sessions.length,
      totalCalories,
      totalDuration,
      goalsReached,
      goalsTotal: goals.length,
      imc,
    };
  }, [sessions, goals, user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-wellness-brown tracking-tight">
          Bonjour, {user.name.split(" ")[0]}
        </h1>
        <p className="text-wellness-brown/60 mt-1">Ton tableau de bord</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 text-wellness-sage-muted mb-2">
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs font-medium">Séances</span>
          </div>
          <p className="text-2xl font-bold text-wellness-brown">{stats.sessionsCount}</p>
          <p className="text-xs text-wellness-brown/60">total</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 text-wellness-sage-muted mb-2">
            <Flame className="w-5 h-5" />
            <span className="text-xs font-medium">Calories</span>
          </div>
          <p className="text-2xl font-bold text-wellness-brown">{stats.totalCalories}</p>
          <p className="text-xs text-wellness-brown/60">brûlées</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-medium">Temps</span>
          </div>
          <p className="text-2xl font-bold text-wellness-brown">{stats.totalDuration}</p>
          <p className="text-xs text-wellness-brown/60">minutes</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 text-wellness-sage-muted mb-2">
            <Target className="w-5 h-5" />
            <span className="text-xs font-medium">Objectifs</span>
          </div>
          <p className="text-2xl font-bold text-wellness-brown">
            {stats.goalsReached}/{stats.goalsTotal}
          </p>
          <p className="text-xs text-wellness-brown/60">atteints</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, y: -2 }}
          className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm col-span-2 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <Scale className="w-5 h-5" />
            <span className="text-xs font-medium">Poids / IMC</span>
          </div>
          <p className="text-2xl font-bold text-wellness-brown">
            {user.weight} kg — IMC {stats.imc}
          </p>
          <p className="text-xs text-wellness-brown/60">niveau {user.level}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-semibold text-wellness-brown mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-wellness-sage-muted" />
          Graphiques
        </h2>
        <DashboardCharts sessions={sessions} goals={goals} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link
          href="/fitness/sessions"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-wellness-brown/90 transition-colors"
        >
          Ajouter une séance
        </Link>
        <Link
          href="/fitness/goals"
          className="px-4 py-2 bg-white border border-wellness-sage/25 text-orange-700 rounded-lg font-medium hover:bg-wellness-sage/10 transition-colors"
        >
          Gérer les objectifs
        </Link>
        <Link
          href="/fitness/routines"
          className="px-4 py-2 bg-white border border-wellness-sage/25 text-orange-700 rounded-lg font-medium hover:bg-wellness-sage/10 transition-colors"
        >
          Voir les routines
        </Link>
      </motion.div>
    </div>
  );
}
