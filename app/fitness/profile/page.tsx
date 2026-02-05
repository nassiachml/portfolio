"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Scale, Ruler, Calendar, Target, Pencil, Check, X } from "lucide-react";
import type { UserLevel } from "../types";

const LEVELS: UserLevel[] = ["débutant", "intermédiaire", "avancé"];

function bmi(weight: number, height: number): number {
  const h = height / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

export default function ProfilePage() {
  const { user, getSessionsForUser, getGoalsForUser, updateUser } = useFitness();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", age: 0, weight: 0, height: 0, level: "débutant" as UserLevel });

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        level: user.level,
      });
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    updateUser({
      name: form.name.trim() || user.name,
      age: form.age > 0 ? form.age : user.age,
      weight: form.weight > 0 ? form.weight : user.weight,
      height: form.height > 0 ? form.height : user.height,
      level: form.level,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        level: user.level,
      });
    }
    setEditing(false);
  };

  if (!user) return null;

  const sessions = getSessionsForUser(user.id);
  const goals = getGoalsForUser(user.id);
  const goalsReached = goals.filter((g) => g.currentProgress >= g.target).length;
  const totalCalories = sessions.reduce((acc, s) => acc + s.caloriesBurned, 0);
  const totalDuration = sessions.reduce((acc, s) => acc + s.duration, 0);

  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-wellness-off-white rounded-2xl border border-orange-100 shadow-lg overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-wellness-off-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-wellness-off-white rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-wellness-off-white/20 flex items-center justify-center backdrop-blur-sm border-2 border-white/30"
              >
                <User className="w-10 h-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-orange-100 text-sm">{user.email}</p>
                <p className="text-sm mt-1 capitalize">Niveau : {user.level}</p>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {!editing ? (
                <motion.button
                  key="edit"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-wellness-off-white/20 hover:bg-wellness-off-white/30 rounded-xl font-medium transition-colors backdrop-blur-sm"
                >
                  <Pencil className="w-4 h-4" />
                  Modifier
                </motion.button>
              ) : (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-wellness-off-white text-orange-700 rounded-xl font-medium hover:bg-orange-50 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Enregistrer
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-wellness-off-white/20 hover:bg-wellness-off-white/30 rounded-xl font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="p-6 space-y-6"
        >
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-3">Informations personnelles</h2>
            <AnimatePresence mode="wait">
              {editing ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Âge</label>
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={form.age || ""}
                        onChange={(e) => setForm((f) => ({ ...f, age: Number(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Poids (kg)</label>
                      <input
                        type="number"
                        min={1}
                        value={form.weight || ""}
                        onChange={(e) => setForm((f) => ({ ...f, weight: Number(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Taille (cm)</label>
                      <input
                        type="number"
                        min={1}
                        value={form.height || ""}
                        onChange={(e) => setForm((f) => ({ ...f, height: Number(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Niveau</label>
                      <select
                        value={form.level}
                        onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as UserLevel }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500"
                      >
                        {LEVELS.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="display"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { Icon: Scale, label: "Poids", value: `${user.weight} kg` },
                    { Icon: Ruler, label: "Taille", value: `${user.height} cm` },
                    { Icon: () => <span className="text-lg">📐</span>, label: "IMC", value: String(bmi(user.weight, user.height)) },
                    { Icon: Calendar, label: "Âge", value: `${user.age} ans` },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-wellness-sage/10 transition-colors border border-slate-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-wellness-sage/15 flex items-center justify-center text-orange-600 text-xl">
                        {row.label === "IMC" ? "📐" : <row.Icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{row.label}</p>
                        <p className="font-semibold text-wellness-brown">{row.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div variants={item}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-3">Historique (résumé)</h2>
            <div className="grid grid-cols-3 gap-4">
              <motion.div variants={item} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
                <p className="text-2xl font-bold text-orange-700">{sessions.length}</p>
                <p className="text-xs text-slate-500 mt-1">Séances</p>
              </motion.div>
              <motion.div variants={item} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl bg-wellness-sand/50 border border-amber-100 text-center">
                <p className="text-2xl font-bold text-wellness-sage-muted">{totalCalories}</p>
                <p className="text-xs text-slate-500 mt-1">Calories brûlées</p>
              </motion.div>
              <motion.div variants={item} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                <p className="text-2xl font-bold text-blue-700">{totalDuration} min</p>
                <p className="text-xs text-slate-500 mt-1">Temps total</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <Target className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-wellness-brown/70">
              <span className="font-semibold text-orange-700">{goalsReached}</span> objectif(s) atteint(s) sur <span className="font-semibold">{goals.length}</span> au total.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
