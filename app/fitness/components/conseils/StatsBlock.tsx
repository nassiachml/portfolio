"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Calendar, TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { getPersonalizedTip, getTrendLabel } from "../../conseils/utils/personalize";
import type { UserStats } from "../../conseils/hooks/useUserStats";

interface StatsBlockProps {
  stats: UserStats | null;
}

export default function StatsBlock({ stats }: StatsBlockProps) {
  const tip = getPersonalizedTip(stats);

  if (!stats) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl bg-wellness-off-white border border-wellness-sage/20 p-8"
      >
        <p className="text-wellness-brown/60 text-center py-2">
          Connecte-toi pour voir tes statistiques et des conseils adaptés à ton rythme.
        </p>
        <Link
          href="/fitness/login"
          className="block text-center text-wellness-sage font-medium mt-3 hover:text-wellness-sage-muted transition-colors duration-300"
        >
          Se connecter
        </Link>
      </motion.section>
    );
  }

  const TrendIcon = stats.trend === "up" ? TrendingUp : stats.trend === "down" ? TrendingDown : Minus;
  const trendColor =
    stats.trend === "up"
      ? "text-wellness-sage-muted bg-wellness-sage/15"
      : stats.trend === "down"
        ? "text-wellness-brown/70 bg-wellness-sand/80"
        : "text-wellness-brown/60 bg-wellness-sand/60";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-2xl bg-wellness-off-white border border-wellness-sage/20 overflow-hidden"
    >
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-medium text-wellness-brown tracking-tight">Ta trace</h2>
          <Link
            href="/fitness"
            className="flex items-center gap-1.5 text-sm font-medium text-wellness-sage hover:text-wellness-sage-muted transition-colors duration-300"
          >
            <BarChart3 className="w-4 h-4" />
            Tableau de bord
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-wellness-beige border border-wellness-sage/15 p-5">
            <div className="flex items-center gap-2 text-wellness-sage-muted mb-1">
              <Flame className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium">Calories totales</span>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-medium text-wellness-brown tracking-tight">
              <AnimatedCounter value={stats.totalCalories} />
              <span className="text-base font-sans font-normal text-wellness-brown/60 ml-1">kcal</span>
            </p>
          </div>
          <div className="rounded-xl bg-wellness-sand/50 border border-wellness-sage/10 p-5">
            <div className="flex items-center gap-2 text-wellness-brown/60 mb-1">
              <Calendar className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium">Cette semaine</span>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-medium text-wellness-brown tracking-tight">
              <AnimatedCounter value={stats.weeklyCalories} />
              <span className="text-base font-sans font-normal text-wellness-brown/60 ml-1">kcal</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${trendColor}`}
          >
            <TrendIcon className="w-4 h-4" />
            {getTrendLabel(stats.trend)}
          </span>
          <span className="text-wellness-brown/50 text-sm">
            {stats.sessionsThisWeek} séance{stats.sessionsThisWeek !== 1 ? "s" : ""} cette semaine
          </span>
        </div>

        <div className="rounded-xl bg-wellness-sage/10 border border-wellness-sage/20 p-5">
          <p className="text-sm font-medium text-wellness-brown/80 mb-1">Conseil</p>
          <p className="text-wellness-brown/80 text-sm leading-relaxed">{tip}</p>
        </div>
      </div>
    </motion.section>
  );
}
