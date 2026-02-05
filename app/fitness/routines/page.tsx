"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFitness } from "../context/FitnessContext";
import { motion } from "framer-motion";
import { Repeat, ChevronDown, ChevronUp } from "lucide-react";
import type { UserLevel } from "../types";

const LEVELS: UserLevel[] = ["débutant", "intermédiaire", "avancé"];

export default function RoutinesPage() {
  const { user, getRoutinesByLevel } = useFitness();
  const router = useRouter();
  const [level, setLevel] = useState<UserLevel>("débutant");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.replace("/fitness/login");
  }, [user, router]);

  const routinesForLevel = getRoutinesByLevel(level);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-wellness-brown mb-2">Routines suggérées</h1>
      <p className="text-wellness-brown/60 mb-6">Routines adaptées à votre niveau : <strong className="text-wellness-sage-muted">{user.level}</strong></p>

      <div className="flex flex-wrap gap-2 mb-6">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              level === l ? "bg-wellness-brown text-white" : "bg-white border border-wellness-sage/25 text-wellness-brown/70 hover:bg-wellness-sage/10"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {routinesForLevel.length === 0 ? (
          <div className="bg-white rounded-xl border border-wellness-sage/20 p-12 text-center text-wellness-brown/60">
            Aucune routine pour ce niveau.
          </div>
        ) : (
          routinesForLevel.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-wellness-sage/20 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-wellness-sage/10/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-wellness-sage/15 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-wellness-sage-muted" />
                  </div>
                  <div>
                    <p className="font-semibold text-wellness-brown">{r.name}</p>
                    <p className="text-sm text-wellness-brown/60 capitalize">Niveau {r.level}</p>
                  </div>
                </div>
                {expandedId === r.id ? <ChevronUp className="w-5 h-5 text-wellness-brown/50" /> : <ChevronDown className="w-5 h-5 text-wellness-brown/50" />}
              </button>
              {expandedId === r.id && (
                <div className="px-4 pb-4 pt-0 border-t border-wellness-sage/15">
                  <ul className="mt-3 space-y-2">
                    {r.exercises.map((ex, j) => (
                      <li key={j} className="flex items-center justify-between text-sm text-wellness-brown/70">
                        <span>{ex.name}</span>
                        {ex.reps != null && <span>{ex.reps} reps</span>}
                        {ex.duration != null && <span>{ex.duration} s</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
