"use client";

import { useMemo } from "react";
import { useFitness } from "../../context/FitnessContext";
import type { Session, Goal } from "../../types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isInWeek(dateStr: string, weekStart: Date): boolean {
  const d = new Date(dateStr);
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 7);
  return d >= weekStart && d < end;
}

function isInPreviousWeek(dateStr: string, weekStart: Date): boolean {
  const d = new Date(dateStr);
  const prevStart = new Date(weekStart);
  prevStart.setDate(prevStart.getDate() - 7);
  const end = new Date(weekStart);
  return d >= prevStart && d < end;
}

export type Trend = "up" | "down" | "stable";

export interface UserStats {
  totalCalories: number;
  weeklyCalories: number;
  previousWeekCalories: number;
  trend: Trend;
  sessionsThisWeek: number;
  sessionsPreviousWeek: number;
  totalSessions: number;
  sessionTypes: Record<string, number>;
  activeGoals: Goal[];
  primaryGoal: string | null;
  level: string;
  daysActiveThisWeek: number;
  regularityScore: number; // 0-100
  userName: string;
}

export function useUserStats(): UserStats | null {
  const { user, sessions, goals, getSessionsForUser, getGoalsForUser } = useFitness();

  return useMemo(() => {
    if (!user) return null;

    const userSessions = getSessionsForUser(user.id);
    const userGoals = getGoalsForUser(user.id);
    const now = new Date();
    const thisWeekStart = getStartOfWeek(now);

    const totalCalories = userSessions.reduce((sum, s) => sum + s.caloriesBurned, 0);
    const sessionsThisWeek = userSessions.filter((s) => isInWeek(s.date, thisWeekStart));
    const weeklyCalories = sessionsThisWeek.reduce((sum, s) => sum + s.caloriesBurned, 0);
    const previousWeekSessions = userSessions.filter((s) =>
      isInPreviousWeek(s.date, thisWeekStart)
    );
    const previousWeekCalories = previousWeekSessions.reduce(
      (sum, s) => sum + s.caloriesBurned,
      0
    );

    let trend: Trend = "stable";
    if (previousWeekCalories > 0) {
      const diff = weeklyCalories - previousWeekCalories;
      if (diff > 50) trend = "up";
      else if (diff < -50) trend = "down";
    } else if (weeklyCalories > 0) trend = "up";

    const sessionTypes: Record<string, number> = {};
    userSessions.forEach((s) => {
      sessionTypes[s.type] = (sessionTypes[s.type] || 0) + 1;
    });

    const uniqueDays = new Set(sessionsThisWeek.map((s) => s.date)).size;
    const regularityScore =
      userSessions.length === 0 ? 0 : Math.min(100, Math.round((uniqueDays / 7) * 50 + (sessionsThisWeek.length / 5) * 50));

    const activeGoals = userGoals.filter((g) => g.currentProgress < g.target);
    const primaryGoal =
      activeGoals.length > 0
        ? activeGoals[0].goal.toLowerCase()
        : null;

    return {
      totalCalories,
      weeklyCalories,
      previousWeekCalories,
      trend,
      sessionsThisWeek: sessionsThisWeek.length,
      sessionsPreviousWeek: previousWeekSessions.length,
      totalSessions: userSessions.length,
      sessionTypes,
      activeGoals,
      primaryGoal,
      level: user.level,
      daysActiveThisWeek: uniqueDays,
      regularityScore,
      userName: user.name.split(" ")[0] || user.name,
    };
  }, [user, sessions, goals, getSessionsForUser, getGoalsForUser]);
}
