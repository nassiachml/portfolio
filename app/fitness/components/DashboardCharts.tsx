"use client";

import { useMemo } from "react";
import type { Session, Goal } from "../types";

const PALETTE = ["#8FAF9A", "#6B8A7A", "#5C4D44", "#3A2F28", "#A8C4B5"];

interface DashboardChartsProps {
  sessions: Session[];
  goals: Goal[];
  weightHistory?: number[];
  dateLabels?: string[];
}

export default function DashboardCharts({
  sessions,
  goals,
  weightHistory = [],
  dateLabels = [],
}: DashboardChartsProps) {
  const caloriesByWeek = useMemo(() => {
    const byWeek: Record<string, number> = {};
    sessions.forEach((s) => {
      const date = new Date(s.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().slice(0, 10);
      byWeek[key] = (byWeek[key] || 0) + s.caloriesBurned;
    });
    const entries = Object.entries(byWeek).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
    return {
      labels: entries.map(([d]) => d.slice(5) || d),
      data: entries.map(([, v]) => v),
    };
  }, [sessions]);

  const sessionTypesCount = useMemo(() => {
    const count: Record<string, number> = {};
    sessions.forEach((s) => {
      count[s.type] = (count[s.type] || 0) + 1;
    });
    return {
      labels: Object.keys(count),
      data: Object.values(count),
    };
  }, [sessions]);

  const goalsProgress = useMemo(() => {
    const completed = goals.filter((g) => g.currentProgress >= g.target).length;
    const total = goals.length;
    return { completed, total };
  }, [goals]);

  const maxCalories = Math.max(1, ...caloriesByWeek.data);
  const totalSessions = sessionTypesCount.data.reduce((a, b) => a + b, 0);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Calories brûlées par semaine</h3>
        <div className="h-64 flex items-end gap-2">
          {caloriesByWeek.data.length === 0 ? (
            <p className="text-wellness-brown/50 text-sm self-center w-full text-center">Aucune donnée</p>
          ) : (
            caloriesByWeek.data.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-orange-400 rounded-t transition-all min-h-[4px]"
                  style={{ height: `${(value / maxCalories) * 100}%` }}
                />
                <span className="text-xs text-slate-500 truncate w-full text-center">{caloriesByWeek.labels[i]}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Répartition des types de séances</h3>
        <div className="h-64 flex flex-col justify-center gap-2">
          {sessionTypesCount.labels.length === 0 ? (
            <p className="text-wellness-brown/50 text-sm">Aucune séance enregistrée</p>
          ) : (
            sessionTypesCount.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="h-3 rounded-full flex-shrink-0 w-3"
                  style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                />
                <span className="text-sm text-slate-600 flex-1">{label}</span>
                <span className="text-sm font-medium text-slate-800">
                  {totalSessions > 0 ? Math.round((sessionTypesCount.data[i] / totalSessions) * 100) : 0}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Objectifs atteints vs en cours</h3>
        <div className="h-64 flex items-center justify-center gap-8">
          {goalsProgress.total === 0 ? (
            <p className="text-wellness-brown/50 text-sm">Aucun objectif défini</p>
          ) : (
            <>
              <div className="flex flex-col items-center p-4 rounded-xl bg-wellness-sage/15 border border-wellness-sage/20">
                <span className="text-3xl font-bold text-wellness-sage-muted">{goalsProgress.completed}</span>
                <span className="text-xs text-slate-500 mt-1">Atteints</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-3xl font-bold text-slate-700">{goalsProgress.total - goalsProgress.completed}</span>
                <span className="text-xs text-slate-500 mt-1">En cours</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-3xl font-bold text-slate-700">{goalsProgress.total}</span>
                <span className="text-xs text-slate-500 mt-1">Total</span>
              </div>
            </>
          )}
        </div>
      </div>

      {weightHistory.length > 0 && (
        <div className="bg-wellness-off-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Évolution du poids (mois)</h3>
          <div className="h-64 flex items-end gap-1">
            {weightHistory.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-orange-400 rounded-t min-h-[4px]"
                  style={{
                    height: `${Math.min(100, (value / Math.max(...weightHistory)) * 100)}%`,
                  }}
                />
                <span className="text-xs text-slate-500">{dateLabels[i] || `J${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
