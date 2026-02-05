"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Plus, Flame, Clock } from "lucide-react";

const SESSION_TYPES = ["Cardio", "Musculation", "Yoga", "Pilates", "HIIT"];

export default function SessionsPage() {
  const { user, getSessionsForUser, addSession } = useFitness();
  const router = useRouter();
  const [sessions, setSessions] = useState(getSessionsForUser(user?.id ?? ""));
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("Cardio");
  const [duration, setDuration] = useState(45);
  const [caloriesBurned, setCaloriesBurned] = useState(300);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  useEffect(() => {
    if (user) setSessions(getSessionsForUser(user.id));
  }, [user, getSessionsForUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSession({ type, duration, caloriesBurned, date });
    setShowForm(false);
    setSessions(getSessionsForUser(user!.id));
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-wellness-brown">Mes séances</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-wellness-brown/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter une séance
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
            <h2 className="text-lg font-semibold text-wellness-brown mb-4">Nouvelle séance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-wellness-sage/25 focus:ring-2 focus:ring-orange-500"
                >
                  {SESSION_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Durée (min)</label>
                  <input
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-wellness-sage/25 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Calories brûlées</label>
                  <input
                    type="number"
                    min={0}
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-wellness-sage/25 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-wellness-sage/25 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-wellness-brown/90">
                  Enregistrer
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-wellness-sand/60 text-slate-700 rounded-lg font-medium hover:bg-slate-200">
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="bg-white rounded-xl border border-wellness-sage/20 p-12 text-center text-wellness-brown/60">
            Aucune séance enregistrée. Ajoutez votre première séance !
          </div>
        ) : (
          sessions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-wellness-sage/20 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-wellness-sage/15 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-wellness-brown">{s.type}</p>
                  <p className="text-sm text-wellness-brown/60">{new Date(s.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-4 h-4" />
                  {s.duration} min
                </span>
                <span className="flex items-center gap-1 text-wellness-sage-muted">
                  <Flame className="w-4 h-4" />
                  {s.caloriesBurned} kcal
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
