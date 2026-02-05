"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OptionCheckboxProps {
  label: string;
  description?: string;
  price: number;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export default function OptionCheckbox({
  label,
  description,
  price,
  isChecked,
  onChange,
  icon,
}: OptionCheckboxProps) {
  return (
    <motion.button
      onClick={() => onChange(!isChecked)}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isChecked
          ? "border-bordeaux-500 bg-bordeaux-900/20"
          : "border-dark-border bg-dark-card/50 hover:border-bordeaux-600/50"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            isChecked
              ? "bg-gradient-bordeaux border-bordeaux-500"
              : "border-dark-border bg-dark-surface"
          }`}
        >
          {isChecked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="text-white" size={16} />
            </motion.div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-white">{label}</h4>
            <span className="text-sm font-bold text-bordeaux-400 whitespace-nowrap">
              +{price.toLocaleString("fr-FR")} €
            </span>
          </div>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-bordeaux-400">{icon}</div>
        )}
      </div>
    </motion.button>
  );
}
