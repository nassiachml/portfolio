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
  color?: "emerald" | "orange" | "pink";
}

export default function OptionCheckbox({
  label,
  description,
  price,
  isChecked,
  onChange,
  icon,
  color = "emerald",
}: OptionCheckboxProps) {
  const colorClasses = {
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-900/20",
      shadow: "shadow-emerald-900/30",
      hover: "hover:border-emerald-600/50",
      text: "text-emerald-400",
    },
    orange: {
      border: "border-orange-500",
      bg: "bg-orange-900/20",
      shadow: "shadow-orange-900/30",
      hover: "hover:border-orange-600/50",
      text: "text-orange-400",
    },
    pink: {
      border: "border-pink-500",
      bg: "bg-pink-900/20",
      shadow: "shadow-pink-900/30",
      hover: "hover:border-pink-600/50",
      text: "text-pink-400",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.button
      onClick={() => onChange(!isChecked)}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isChecked
          ? `${colors.border} ${colors.bg} shadow-lg ${colors.shadow}`
          : `border-dark-border bg-dark-card/50 ${colors.hover}`
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            isChecked
              ? `${colors.border} bg-gradient-to-br ${
                  color === "emerald"
                    ? "from-emerald-500 to-emerald-600"
                    : color === "orange"
                    ? "from-orange-500 to-orange-600"
                    : "from-pink-500 to-pink-600"
                }`
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
            <div className="flex items-center gap-2">
              {icon && <div className={colors.text}>{icon}</div>}
              <h4 className="font-semibold text-white">{label}</h4>
            </div>
            <span className={`text-sm font-bold ${colors.text} whitespace-nowrap`}>
              +{price.toLocaleString("fr-FR")} €
            </span>
          </div>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
