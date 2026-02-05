"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  index: number;
  darkMode?: boolean;
}

export default function StatCard({ label, value, icon, color, index, darkMode = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`rounded-xl p-6 border shadow-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">{value}</span>
        </div>
      </div>
      <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{label}</p>
    </motion.div>
  );
}
